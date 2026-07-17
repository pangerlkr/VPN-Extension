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
    id: "us-lax",
    country: "United States",
    city: "Los Angeles",
    flag: "US",
    latencyMs: 57,
    load: 43,
    endpoint: { scheme: "https", host: "us-lax.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "us-las",
    country: "United States",
    city: "Las Vegas",
    flag: "US",
    latencyMs: 63,
    load: 47,
    endpoint: { scheme: "https", host: "us-las.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "us-was",
    country: "United States",
    city: "Washington, D.C.",
    flag: "US",
    latencyMs: 49,
    load: 36,
    endpoint: { scheme: "https", host: "us-was.proxy.example.com", port: 443 },
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
    id: "ar-bue",
    country: "Argentina",
    city: "Buenos Aires",
    flag: "AR",
    latencyMs: 151,
    load: 42,
    endpoint: { scheme: "https", host: "ar-bue.proxy.example.com", port: 443 },
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
  },
  {
    id: "cd-fih",
    country: "Congo",
    city: "Kinshasa",
    flag: "CD",
    latencyMs: 178,
    load: 58,
    endpoint: { scheme: "https", host: "cd-fih.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "in-mum",
    country: "India",
    city: "Mumbai",
    flag: "IN",
    latencyMs: 166,
    load: 49,
    endpoint: { scheme: "https", host: "in-mum.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "cn-bjs",
    country: "China",
    city: "Beijing",
    flag: "CN",
    latencyMs: 189,
    load: 56,
    endpoint: { scheme: "https", host: "cn-bjs.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "bd-dac",
    country: "Bangladesh",
    city: "Dhaka",
    flag: "BD",
    latencyMs: 198,
    load: 54,
    endpoint: { scheme: "https", host: "bd-dac.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "ph-mnl",
    country: "Philippines",
    city: "Manila",
    flag: "PH",
    latencyMs: 206,
    load: 53,
    endpoint: { scheme: "https", host: "ph-mnl.proxy.example.com", port: 443 },
    auth: { username: "demo", password: "demo" }
  },
  {
    id: "id-jkt",
    country: "Indonesia",
    city: "Jakarta",
    flag: "ID",
    latencyMs: 194,
    load: 51,
    endpoint: { scheme: "https", host: "id-jkt.proxy.example.com", port: 443 },
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
