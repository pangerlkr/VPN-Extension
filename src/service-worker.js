import { DEFAULT_STATE, REGIONS } from "./regions.js";

let cachedAuth = null;

const getStoredState = async () => {
  const stored = await chrome.storage.local.get(DEFAULT_STATE);
  return {
    ...DEFAULT_STATE,
    ...stored,
    regionOverrides: stored.regionOverrides || {}
  };
};

const getMergedRegion = (region, override) => {
  if (!override) return region;
  return {
    ...region,
    endpoint: {
      ...region.endpoint,
      ...(override.endpoint || {})
    },
    auth: override.auth || region.auth
  };
};

const getEffectiveRegions = (state) =>
  REGIONS.map((region) => getMergedRegion(region, state.regionOverrides?.[region.id]));

const getRegion = (state, regionId) => {
  const regions = getEffectiveRegions(state);
  return regions.find((region) => region.id === regionId) || regions[0];
};

const isProductionEndpoint = (region) => {
  const host = region?.endpoint?.host || "";
  return host && !host.endsWith(".example.com") && host !== "localhost" && host !== "127.0.0.1";
};

const buildProxyConfig = (region) => ({
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: region.endpoint.scheme,
      host: region.endpoint.host,
      port: region.endpoint.port
    },
    bypassList: ["localhost", "127.0.0.1", "::1"]
  }
});

const setBadge = async (enabled, region) => {
  await chrome.action.setBadgeText({ text: enabled ? region.flag : "" });
  await chrome.action.setBadgeBackgroundColor({ color: enabled ? "#1f8f5f" : "#5b6678" });
};

const applyPrivacyRules = async (state) => {
  if (!chrome.privacy?.network) return;
  if (state.blockWebRtc && chrome.privacy.network.webRTCIPHandlingPolicy) {
    await chrome.privacy.network.webRTCIPHandlingPolicy.set({
      value: "disable_non_proxied_udp"
    });
  } else if (chrome.privacy.network.webRTCIPHandlingPolicy) {
    await chrome.privacy.network.webRTCIPHandlingPolicy.clear({});
  }
};

const enableProxy = async (region) => {
  if (!isProductionEndpoint(region)) {
    throw new Error("This region still uses a placeholder gateway. Add a real proxy endpoint before connecting.");
  }
  cachedAuth = region.auth || null;
  await chrome.proxy.settings.set({
    value: buildProxyConfig(region),
    scope: "regular"
  });
};

const disableProxy = async () => {
  cachedAuth = null;
  await chrome.proxy.settings.clear({ scope: "regular" });
};

const applyState = async (state) => {
  const region = getRegion(state, state.selectedRegionId);
  if (state.enabled) {
    await enableProxy(region);
  } else {
    await disableProxy();
  }
  await applyPrivacyRules(state);
  await setBadge(state.enabled, region);
};

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.local.get(null);
  if (!stored.selectedRegionId) {
    await chrome.storage.local.set(DEFAULT_STATE);
  }
  await applyState(await getStoredState());
});

chrome.runtime.onStartup.addListener(async () => {
  await applyState(await getStoredState());
});

chrome.webRequest.onAuthRequired.addListener(
  (_details, callback) => {
    callback(cachedAuth ? { authCredentials: cachedAuth } : {});
  },
  { urls: ["<all_urls>"] },
  ["asyncBlocking"]
);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const respond = async () => {
    if (message.type === "GET_STATE") {
      const state = await getStoredState();
      const regions = getEffectiveRegions(state);
      return {
        state,
        regions: regions.map((region) => ({ ...region, ready: isProductionEndpoint(region) }))
      };
    }

    if (message.type === "SET_REGION") {
      const currentState = await getStoredState();
      const region = getRegion(currentState, message.regionId);
      const state = { ...(await getStoredState()), selectedRegionId: region.id, lastConnectedAt: Date.now() };
      await chrome.storage.local.set(state);
      await applyState(state);
      return { state, region };
    }

    if (message.type === "SET_ENABLED") {
      const state = { ...(await getStoredState()), enabled: Boolean(message.enabled), lastConnectedAt: message.enabled ? Date.now() : null };
      const region = getRegion(state, state.selectedRegionId);
      if (state.enabled && !isProductionEndpoint(region)) {
        return {
          state: { ...state, enabled: false, lastConnectedAt: null },
          error: "Add a real proxy endpoint for this region before connecting."
        };
      }
      await chrome.storage.local.set(state);
      await applyState(state);
      return { state };
    }

    if (message.type === "SET_WEBRTC") {
      const state = { ...(await getStoredState()), blockWebRtc: Boolean(message.blockWebRtc) };
      await chrome.storage.local.set(state);
      await applyState(state);
      return { state };
    }

    if (message.type === "GET_REGION_CONFIGS") {
      const state = await getStoredState();
      const regions = REGIONS.map((region) => {
        const override = state.regionOverrides?.[region.id] || null;
        const effective = getMergedRegion(region, override);
        return {
          id: region.id,
          city: region.city,
          country: region.country,
          endpoint: effective.endpoint,
          auth: effective.auth,
          hasOverride: Boolean(override),
          ready: isProductionEndpoint(effective)
        };
      });
      return { regions };
    }

    if (message.type === "SAVE_REGION_CONFIG") {
      const state = await getStoredState();
      const region = REGIONS.find((item) => item.id === message.regionId);
      if (!region) {
        return { error: "Unknown region." };
      }

      const endpoint = {
        scheme: String(message.endpoint?.scheme || "").trim().toLowerCase(),
        host: String(message.endpoint?.host || "").trim(),
        port: Number(message.endpoint?.port)
      };

      if (!["http", "https", "socks4", "socks5"].includes(endpoint.scheme)) {
        return { error: "Proxy scheme must be http, https, socks4, or socks5." };
      }
      if (!endpoint.host) {
        return { error: "Proxy host is required." };
      }
      if (!Number.isInteger(endpoint.port) || endpoint.port < 1 || endpoint.port > 65535) {
        return { error: "Proxy port must be a number between 1 and 65535." };
      }

      const username = String(message.auth?.username || "").trim();
      const password = String(message.auth?.password || "").trim();
      if ((username && !password) || (!username && password)) {
        return { error: "Provide both username and password, or leave both empty." };
      }

      const regionOverrides = { ...(state.regionOverrides || {}) };
      regionOverrides[region.id] = {
        endpoint,
        auth: username ? { username, password } : null
      };

      const nextState = { ...state, regionOverrides };
      await chrome.storage.local.set({ regionOverrides });

      if (state.enabled && state.selectedRegionId === region.id) {
        await applyState(nextState);
      }

      return {
        state: nextState,
        region: { ...getMergedRegion(region, regionOverrides[region.id]), ready: isProductionEndpoint(getMergedRegion(region, regionOverrides[region.id])) }
      };
    }

    if (message.type === "RESET_REGION_CONFIG") {
      const state = await getStoredState();
      const regionOverrides = { ...(state.regionOverrides || {}) };
      delete regionOverrides[message.regionId];
      const nextState = { ...state, regionOverrides };
      await chrome.storage.local.set({ regionOverrides });

      if (state.enabled && state.selectedRegionId === message.regionId) {
        await applyState(nextState);
      }

      return { state: nextState };
    }

    if (message.type === "CHECK_IP") {
      const response = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
      const data = await response.json();
      await chrome.storage.local.set({ lastKnownIp: data.ip });
      return { ip: data.ip };
    }

    return { error: "Unknown message type" };
  };

  respond()
    .then(sendResponse)
    .catch((error) => sendResponse({ error: error.message }));
  return true;
});
