// VeilRoute Proxy — Region definitions
// Each region ships with placeholder endpoints.
// Override per-region in Settings → Gateway configuration.

export const REGIONS = [
  {
    id: "us-nyc",
    country: "United States",
    city: "New York",
    flag: "🇺🇸",
    continent: "Americas",
    latencyMs: 42,
    load: 38,
    endpoint: { scheme: "https", host: "us-nyc.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "us-lax",
    country: "United States",
    city: "Los Angeles",
    flag: "🇺🇸",
    continent: "Americas",
    latencyMs: 57,
    load: 43,
    endpoint: { scheme: "https", host: "us-lax.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "us-sfo",
    country: "United States",
    city: "San Francisco",
    flag: "🇺🇸",
    continent: "Americas",
    latencyMs: 68,
    load: 51,
    endpoint: { scheme: "https", host: "us-sfo.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "us-was",
    country: "United States",
    city: "Washington D.C.",
    flag: "🇺🇸",
    continent: "Americas",
    latencyMs: 49,
    load: 36,
    endpoint: { scheme: "https", host: "us-was.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "gb-lon",
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    continent: "Europe",
    latencyMs: 91,
    load: 44,
    endpoint: { scheme: "https", host: "gb-lon.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "de-fra",
    country: "Germany",
    city: "Frankfurt",
    flag: "🇩🇪",
    continent: "Europe",
    latencyMs: 101,
    load: 29,
    endpoint: { scheme: "https", host: "de-fra.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "nl-ams",
    country: "Netherlands",
    city: "Amsterdam",
    flag: "🇳🇱",
    continent: "Europe",
    latencyMs: 97,
    load: 33,
    endpoint: { scheme: "https", host: "nl-ams.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "fr-par",
    country: "France",
    city: "Paris",
    flag: "🇫🇷",
    continent: "Europe",
    latencyMs: 98,
    load: 31,
    endpoint: { scheme: "https", host: "fr-par.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "sg-sin",
    country: "Singapore",
    city: "Singapore",
    flag: "🇸🇬",
    continent: "Asia",
    latencyMs: 173,
    load: 62,
    endpoint: { scheme: "https", host: "sg-sin.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "jp-tyo",
    country: "Japan",
    city: "Tokyo",
    flag: "🇯🇵",
    continent: "Asia",
    latencyMs: 184,
    load: 35,
    endpoint: { scheme: "https", host: "jp-tyo.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "in-mum",
    country: "India",
    city: "Mumbai",
    flag: "🇮🇳",
    continent: "Asia",
    latencyMs: 166,
    load: 49,
    endpoint: { scheme: "https", host: "in-mum.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "kr-sel",
    country: "South Korea",
    city: "Seoul",
    flag: "🇰🇷",
    continent: "Asia",
    latencyMs: 176,
    load: 38,
    endpoint: { scheme: "https", host: "kr-sel.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "au-syd",
    country: "Australia",
    city: "Sydney",
    flag: "🇦🇺",
    continent: "Oceania",
    latencyMs: 222,
    load: 57,
    endpoint: { scheme: "https", host: "au-syd.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "br-sao",
    country: "Brazil",
    city: "Sao Paulo",
    flag: "🇧🇷",
    continent: "Americas",
    latencyMs: 139,
    load: 46,
    endpoint: { scheme: "https", host: "br-sao.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "ca-tor",
    country: "Canada",
    city: "Toronto",
    flag: "🇨🇦",
    continent: "Americas",
    latencyMs: 55,
    load: 40,
    endpoint: { scheme: "https", host: "ca-tor.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "za-jnb",
    country: "South Africa",
    city: "Johannesburg",
    flag: "🇿🇦",
    continent: "Africa",
    latencyMs: 195,
    load: 44,
    endpoint: { scheme: "https", host: "za-jnb.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "ae-dxb",
    country: "UAE",
    city: "Dubai",
    flag: "🇦🇪",
    continent: "Asia",
    latencyMs: 148,
    load: 52,
    endpoint: { scheme: "https", host: "ae-dxb.proxy.example.com", port: 443 },
    auth: null
  },
  {
    id: "id-jkt",
    country: "Indonesia",
    city: "Jakarta",
    flag: "🇮🇩",
    continent: "Asia",
    latencyMs: 194,
    load: 51,
    endpoint: { scheme: "https", host: "id-jkt.proxy.example.com", port: 443 },
    auth: null
  }
];

export const DEFAULT_STATE = {
  enabled: false,
  selectedRegionId: "us-nyc",
  blockWebRtc: true,
  regionOverrides: {},
  lastConnectedAt: null,
  lastKnownIp: null,
  lastError: null,
  version: "1.0.0"
};
