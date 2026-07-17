export const REGIONS = [
  {
    id: "us-nyc",
    country: "United States",
    city: "New York",
    flag: "US",
    latencyMs: 42,
    load: 38,
    endpoint: { scheme: "https", host: "us-nyc.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "us-sfo",
    country: "United States",
    city: "San Francisco",
    flag: "US",
    latencyMs: 68,
    load: 51,
    endpoint: { scheme: "https", host: "us-sfo.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "gb-lon",
    country: "United Kingdom",
    city: "London",
    flag: "GB",
    latencyMs: 91,
    load: 44,
    endpoint: { scheme: "https", host: "gb-lon.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "de-fra",
    country: "Germany",
    city: "Frankfurt",
    flag: "DE",
    latencyMs: 101,
    load: 29,
    endpoint: { scheme: "https", host: "de-fra.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "sg-sin",
    country: "Singapore",
    city: "Singapore",
    flag: "SG",
    latencyMs: 173,
    load: 62,
    endpoint: { scheme: "https", host: "sg-sin.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "jp-tyo",
    country: "Japan",
    city: "Tokyo",
    flag: "JP",
    latencyMs: 184,
    load: 35,
    endpoint: { scheme: "https", host: "jp-tyo.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "au-syd",
    country: "Australia",
    city: "Sydney",
    flag: "AU",
    latencyMs: 222,
    load: 57,
    endpoint: { scheme: "https", host: "au-syd.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "br-sao",
    country: "Brazil",
    city: "Sao Paulo",
    flag: "BR",
    latencyMs: 139,
    load: 46,
    endpoint: { scheme: "https", host: "br-sao.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  }
];

export const DEFAULT_STATE = {
  enabled: false,
  selectedRegionId: "us-nyc",
  mode: "fixed_servers",
  blockWebRtc: true,
  regionOverrides: {},
  lastConnectedAt: null,
  lastKnownIp: "Not checked"
};
