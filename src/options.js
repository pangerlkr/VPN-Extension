const elements = {
  toggle: document.querySelector("#webrtcToggle"),
  regionSelect: document.querySelector("#regionSelect"),
  schemeInput: document.querySelector("#schemeInput"),
  hostInput: document.querySelector("#hostInput"),
  portInput: document.querySelector("#portInput"),
  usernameInput: document.querySelector("#usernameInput"),
  passwordInput: document.querySelector("#passwordInput"),
  saveRegionButton: document.querySelector("#saveRegionButton"),
  resetRegionButton: document.querySelector("#resetRegionButton"),
  configStatus: document.querySelector("#configStatus")
};

const send = (message) => chrome.runtime.sendMessage(message);

let regionConfigs = [];

const setStatus = (message, tone = "neutral") => {
  elements.configStatus.textContent = message;
  elements.configStatus.dataset.tone = tone;
};

const getActiveRegion = () => regionConfigs.find((region) => region.id === elements.regionSelect.value) || regionConfigs[0];

const renderRegionForm = () => {
  const region = getActiveRegion();
  if (!region) return;

  elements.schemeInput.value = region.endpoint.scheme;
  elements.hostInput.value = region.endpoint.host;
  elements.portInput.value = String(region.endpoint.port);
  elements.usernameInput.value = region.auth?.username || "";
  elements.passwordInput.value = region.auth?.password || "";
  setStatus(region.hasOverride ? "Custom gateway is active for this region." : "Using default demo gateway for this region.");
};

const renderRegionSelect = () => {
  const previousSelection = elements.regionSelect.value;
  elements.regionSelect.innerHTML = "";
  regionConfigs.forEach((region) => {
    const option = document.createElement("option");
    option.value = region.id;
    option.textContent = `${region.city}, ${region.country}${region.ready ? "" : " (not ready)"}`;
    elements.regionSelect.append(option);
  });
  if (!regionConfigs.length) return;
  elements.regionSelect.value = regionConfigs.some((region) => region.id === previousSelection)
    ? previousSelection
    : regionConfigs[0].id;
};

const refreshRegionConfigs = async () => {
  const response = await send({ type: "GET_REGION_CONFIGS" });
  regionConfigs = response.regions || [];
  renderRegionSelect();
  renderRegionForm();
};

elements.toggle.addEventListener("change", async () => {
  await send({ type: "SET_WEBRTC", blockWebRtc: elements.toggle.checked });
});

elements.regionSelect.addEventListener("change", () => {
  renderRegionForm();
});

elements.saveRegionButton.addEventListener("click", async () => {
  const region = getActiveRegion();
  if (!region) return;

  const response = await send({
    type: "SAVE_REGION_CONFIG",
    regionId: region.id,
    endpoint: {
      scheme: elements.schemeInput.value,
      host: elements.hostInput.value,
      port: elements.portInput.value
    },
    auth: {
      username: elements.usernameInput.value,
      password: elements.passwordInput.value
    }
  });

  if (response.error) {
    setStatus(response.error, "error");
    return;
  }

  await refreshRegionConfigs();
  elements.regionSelect.value = region.id;
  renderRegionForm();
  setStatus("Gateway configuration saved.", "success");
});

elements.resetRegionButton.addEventListener("click", async () => {
  const region = getActiveRegion();
  if (!region) return;

  const response = await send({ type: "RESET_REGION_CONFIG", regionId: region.id });
  if (response.error) {
    setStatus(response.error, "error");
    return;
  }

  await refreshRegionConfigs();
  elements.regionSelect.value = region.id;
  renderRegionForm();
  setStatus("Gateway reset to bundled default.", "success");
});

const init = async () => {
  const stateResponse = await send({ type: "GET_STATE" });
  elements.toggle.checked = stateResponse.state.blockWebRtc;
  await refreshRegionConfigs();
};

init();
