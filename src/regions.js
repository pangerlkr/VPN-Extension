// VeilRoute Proxy — Region definitions v1.1.0
// Each region ships with placeholder endpoints.
// Override per-region in Settings → Gateway configuration.

export const REGIONS = [
  // ===== AMERICAS =====
  { id: 'us-nyc', country: 'United States', city: 'New York', flag: '🇺🇸', continent: 'Americas', latencyMs: 42, load: 38, endpoint: { scheme: 'https', host: 'us-nyc.proxy.example.com', port: 443 }, auth: null },
  { id: 'us-lax', country: 'United States', city: 'Los Angeles', flag: '🇺🇸', continent: 'Americas', latencyMs: 57, load: 43, endpoint: { scheme: 'https', host: 'us-lax.proxy.example.com', port: 443 }, auth: null },
  { id: 'us-sfo', country: 'United States', city: 'San Francisco', flag: '🇺🇸', continent: 'Americas', latencyMs: 68, load: 51, endpoint: { scheme: 'https', host: 'us-sfo.proxy.example.com', port: 443 }, auth: null },
  { id: 'us-was', country: 'United States', city: 'Washington D.C.', flag: '🇺🇸', continent: 'Americas', latencyMs: 49, load: 36, endpoint: { scheme: 'https', host: 'us-was.proxy.example.com', port: 443 }, auth: null },
  { id: 'us-chi', country: 'United States', city: 'Chicago', flag: '🇺🇸', continent: 'Americas', latencyMs: 45, load: 41, endpoint: { scheme: 'https', host: 'us-chi.proxy.example.com', port: 443 }, auth: null },
  { id: 'us-mia', country: 'United States', city: 'Miami', flag: '🇺🇸', continent: 'Americas', latencyMs: 53, load: 47, endpoint: { scheme: 'https', host: 'us-mia.proxy.example.com', port: 443 }, auth: null },
  { id: 'ca-tor', country: 'Canada', city: 'Toronto', flag: '🇨🇦', continent: 'Americas', latencyMs: 55, load: 40, endpoint: { scheme: 'https', host: 'ca-tor.proxy.example.com', port: 443 }, auth: null },
  { id: 'mx-mex', country: 'Mexico', city: 'Mexico City', flag: '🇲🇽', continent: 'Americas', latencyMs: 78, load: 54, endpoint: { scheme: 'https', host: 'mx-mex.proxy.example.com', port: 443 }, auth: null },
  { id: 'br-sao', country: 'Brazil', city: 'Sao Paulo', flag: '🇧🇷', continent: 'Americas', latencyMs: 139, load: 46, endpoint: { scheme: 'https', host: 'br-sao.proxy.example.com', port: 443 }, auth: null },
  { id: 'cl-scl', country: 'Chile', city: 'Santiago', flag: '🇨🇱', continent: 'Americas', latencyMs: 167, load: 39, endpoint: { scheme: 'https', host: 'cl-scl.proxy.example.com', port: 443 }, auth: null },
  { id: 'ar-bue', country: 'Argentina', city: 'Buenos Aires', flag: '🇦🇷', continent: 'Americas', latencyMs: 174, load: 42, endpoint: { scheme: 'https', host: 'ar-bue.proxy.example.com', port: 443 }, auth: null },

  // ===== EUROPE =====
  { id: 'gb-lon', country: 'United Kingdom', city: 'London', flag: '🇬🇧', continent: 'Europe', latencyMs: 91, load: 44, endpoint: { scheme: 'https', host: 'gb-lon.proxy.example.com', port: 443 }, auth: null },
  { id: 'de-fra', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', continent: 'Europe', latencyMs: 101, load: 29, endpoint: { scheme: 'https', host: 'de-fra.proxy.example.com', port: 443 }, auth: null },
  { id: 'nl-ams', country: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', continent: 'Europe', latencyMs: 97, load: 33, endpoint: { scheme: 'https', host: 'nl-ams.proxy.example.com', port: 443 }, auth: null },
  { id: 'fr-par', country: 'France', city: 'Paris', flag: '🇫🇷', continent: 'Europe', latencyMs: 98, load: 31, endpoint: { scheme: 'https', host: 'fr-par.proxy.example.com', port: 443 }, auth: null },
  { id: 'ch-zur', country: 'Switzerland', city: 'Zurich', flag: '🇨🇭', continent: 'Europe', latencyMs: 103, load: 27, endpoint: { scheme: 'https', host: 'ch-zur.proxy.example.com', port: 443 }, auth: null },
  { id: 'se-sto', country: 'Sweden', city: 'Stockholm', flag: '🇸🇪', continent: 'Europe', latencyMs: 108, load: 35, endpoint: { scheme: 'https', host: 'se-sto.proxy.example.com', port: 443 }, auth: null },
  { id: 'pl-war', country: 'Poland', city: 'Warsaw', flag: '🇵🇱', continent: 'Europe', latencyMs: 112, load: 38, endpoint: { scheme: 'https', host: 'pl-war.proxy.example.com', port: 443 }, auth: null },
  { id: 'es-mad', country: 'Spain', city: 'Madrid', flag: '🇪🇸', continent: 'Europe', latencyMs: 105, load: 41, endpoint: { scheme: 'https', host: 'es-mad.proxy.example.com', port: 443 }, auth: null },
  { id: 'it-mil', country: 'Italy', city: 'Milan', flag: '🇮🇹', continent: 'Europe', latencyMs: 107, load: 37, endpoint: { scheme: 'https', host: 'it-mil.proxy.example.com', port: 443 }, auth: null },
  { id: 'pt-lis', country: 'Portugal', city: 'Lisbon', flag: '🇵🇹', continent: 'Europe', latencyMs: 109, load: 34, endpoint: { scheme: 'https', host: 'pt-lis.proxy.example.com', port: 443 }, auth: null },

  // ===== ASIA =====
  { id: 'sg-sin', country: 'Singapore', city: 'Singapore', flag: '🇸🇬', continent: 'Asia', latencyMs: 173, load: 62, endpoint: { scheme: 'https', host: 'sg-sin.proxy.example.com', port: 443 }, auth: null },
  { id: 'jp-tyo', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', continent: 'Asia', latencyMs: 184, load: 35, endpoint: { scheme: 'https', host: 'jp-tyo.proxy.example.com', port: 443 }, auth: null },
  { id: 'in-mum', country: 'India', city: 'Mumbai', flag: '🇮🇳', continent: 'Asia', latencyMs: 166, load: 49, endpoint: { scheme: 'https', host: 'in-mum.proxy.example.com', port: 443 }, auth: null },
  { id: 'in-del', country: 'India', city: 'Delhi', flag: '🇮🇳', continent: 'Asia', latencyMs: 163, load: 52, endpoint: { scheme: 'https', host: 'in-del.proxy.example.com', port: 443 }, auth: null },
  { id: 'kr-sel', country: 'South Korea', city: 'Seoul', flag: '🇰🇷', continent: 'Asia', latencyMs: 176, load: 38, endpoint: { scheme: 'https', host: 'kr-sel.proxy.example.com', port: 443 }, auth: null },
  { id: 'hk-hkg', country: 'Hong Kong', city: 'Hong Kong', flag: '🇭🇰', continent: 'Asia', latencyMs: 179, load: 45, endpoint: { scheme: 'https', host: 'hk-hkg.proxy.example.com', port: 443 }, auth: null },
  { id: 'tw-tpe', country: 'Taiwan', city: 'Taipei', flag: '🇹🇼', continent: 'Asia', latencyMs: 181, load: 43, endpoint: { scheme: 'https', host: 'tw-tpe.proxy.example.com', port: 443 }, auth: null },
  { id: 'th-bkk', country: 'Thailand', city: 'Bangkok', flag: '🇹🇭', continent: 'Asia', latencyMs: 185, load: 56, endpoint: { scheme: 'https', host: 'th-bkk.proxy.example.com', port: 443 }, auth: null },
  { id: 'vn-han', country: 'Vietnam', city: 'Hanoi', flag: '🇻🇳', continent: 'Asia', latencyMs: 189, load: 58, endpoint: { scheme: 'https', host: 'vn-han.proxy.example.com', port: 443 }, auth: null },
  { id: 'ph-mnl', country: 'Philippines', city: 'Manila', flag: '🇵🇭', continent: 'Asia', latencyMs: 192, load: 61, endpoint: { scheme: 'https', host: 'ph-mnl.proxy.example.com', port: 443 }, auth: null },
  { id: 'my-kul', country: 'Malaysia', city: 'Kuala Lumpur', flag: '🇲🇾', continent: 'Asia', latencyMs: 177, load: 53, endpoint: { scheme: 'https', host: 'my-kul.proxy.example.com', port: 443 }, auth: null },
  { id: 'id-jkt', country: 'Indonesia', city: 'Jakarta', flag: '🇮🇩', continent: 'Asia', latencyMs: 194, load: 51, endpoint: { scheme: 'https', host: 'id-jkt.proxy.example.com', port: 443 }, auth: null },

  // ===== MIDDLE EAST =====
  { id: 'ae-dxb', country: 'UAE', city: 'Dubai', flag: '🇦🇪', continent: 'Middle East', latencyMs: 148, load: 52, endpoint: { scheme: 'https', host: 'ae-dxb.proxy.example.com', port: 443 }, auth: null },
  { id: 'il-tlv', country: 'Israel', city: 'Tel Aviv', flag: '🇮🇱', continent: 'Middle East', latencyMs: 134, load: 46, endpoint: { scheme: 'https', host: 'il-tlv.proxy.example.com', port: 443 }, auth: null },
  { id: 'tr-ist', country: 'Turkey', city: 'Istanbul', flag: '🇹🇷', continent: 'Middle East', latencyMs: 125, load: 49, endpoint: { scheme: 'https', host: 'tr-ist.proxy.example.com', port: 443 }, auth: null },
  { id: 'sa-ruh', country: 'Saudi Arabia', city: 'Riyadh', flag: '🇸🇦', continent: 'Middle East', latencyMs: 156, load: 55, endpoint: { scheme: 'https', host: 'sa-ruh.proxy.example.com', port: 443 }, auth: null },

  // ===== AFRICA =====
  { id: 'za-jnb', country: 'South Africa', city: 'Johannesburg', flag: '🇿🇦', continent: 'Africa', latencyMs: 195, load: 44, endpoint: { scheme: 'https', host: 'za-jnb.proxy.example.com', port: 443 }, auth: null },
  { id: 'ng-los', country: 'Nigeria', city: 'Lagos', flag: '🇳🇬', continent: 'Africa', latencyMs: 187, load: 59, endpoint: { scheme: 'https', host: 'ng-los.proxy.example.com', port: 443 }, auth: null },
  { id: 'ke-nbo', country: 'Kenya', city: 'Nairobi', flag: '🇰🇪', continent: 'Africa', latencyMs: 178, load: 51, endpoint: { scheme: 'https', host: 'ke-nbo.proxy.example.com', port: 443 }, auth: null },
  { id: 'eg-cai', country: 'Egypt', city: 'Cairo', flag: '🇪🇬', continent: 'Africa', latencyMs: 143, load: 48, endpoint: { scheme: 'https', host: 'eg-cai.proxy.example.com', port: 443 }, auth: null },

  // ===== OCEANIA =====
  { id: 'au-syd', country: 'Australia', city: 'Sydney', flag: '🇦🇺', continent: 'Oceania', latencyMs: 222, load: 57, endpoint: { scheme: 'https', host: 'au-syd.proxy.example.com', port: 443 }, auth: null },
  { id: 'au-mel', country: 'Australia', city: 'Melbourne', flag: '🇦🇺', continent: 'Oceania', latencyMs: 227, load: 54, endpoint: { scheme: 'https', host: 'au-mel.proxy.example.com', port: 443 }, auth: null },
  { id: 'nz-akl', country: 'New Zealand', city: 'Auckland', flag: '🇳🇿', continent: 'Oceania', latencyMs: 241, load: 48, endpoint: { scheme: 'https', host: 'nz-akl.proxy.example.com', port: 443 }, auth: null }
];

export const DEFAULT_STATE = {
  enabled: false,
  selectedRegionId: 'us-nyc',
  blockWebRtc: true,
  regionOverrides: {},
  lastConnectedAt: null,
  lastKnownIp: 'Not checked',
  lastError: null,
  version: '1.1.0'
};
