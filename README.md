# VeilRoute Proxy — Production v1.0.0

**Multi-region browser proxy extension for Chromium browsers.**  
Real-time IP verification • WebRTC leak protection • Authenticated gateway support • 18 global regions

---

## 🎉 Production Status

**This extension is now production-ready** as a client for authenticated proxy services.  
The core extension (manifest, service worker, UI, options) has been upgraded to v1.0.0 with:

- ✅ **Hardened service worker**: Input validation, error handling, reconnect logic
- ✅ **Emoji flag regions**: 18 regions across Americas, Europe, Asia, Africa, Oceania
- ✅ **Production manifest**: MV3 compliant, notifications, alarms, strict CSP
- ✅ **Proxy auth support**: HTTPS/SOCKS4/SOCKS5 with credential handling
- ✅ **Runtime validation**: Scheme/host/port checks, demo endpoint blocking
- ✅ **State persistence**: survives browser restart, handles disconnects safely

---

## What This Extension Does

VeilRoute controls Chrome's **browser-level proxy settings** via the `chrome.proxy` API.  
When connected, **all HTTP(S) traffic from this browser** is routed through your configured proxy server.

### ✅ Capabilities

- **Multi-region switching**: 18 pre-configured regions, switch instantly
- **WebRTC leak reduction**: Blocks non-proxied UDP to prevent IP leaks
- **IP verification**: Check your visible IP through ipify API
- **Authenticated proxies**: Username/password support for protected gateways
- **Per-region override**: Configure each region independently in Settings
- **Persistent state**: Proxy settings survive browser restart

### ❌ Limitations

- **Browser-only**: Does not tunnel OS-level traffic (non-browser apps still use your real IP)
- **Not a full VPN**: Cannot hide your identity from determined adversaries
- **No fingerprint protection**: Browser fingerprinting is outside the scope
- **Trust the operator**: You must trust whoever runs the proxy server  
- **Demo endpoints blocked**: The bundled `*.proxy.example.com` endpoints are placeholders and blocked by default

---

## 🚀 Quick Start

### 1. Load the extension

1. Clone or download this repository
2. Open Chrome → `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → Select the `src/` folder
5. VeilRoute Proxy icon should appear in the toolbar

### 2. Configure a real gateway

**The bundled region endpoints are demo placeholders and will not work.**  
You must configure at least one region with a real proxy server:

1. Click the VeilRoute icon → **Settings** (gear icon)
2. Select a region from the dropdown
3. Enter:
   - **Scheme**: `https`, `http`, `socks5`, or `socks4`
   - **Host**: Your proxy hostname or IP (e.g., `proxy.example.net` or `198.51.100.42`)
   - **Port**: Port number (e.g., `443`, `8080`, `1080`)
   - **Username/Password**: Optional proxy credentials
4. Click **Save region gateway**
5. Go back to the popup and press **Connect**

### 3. Verify it works

1. Click **Check IP** in the popup to see your visible IP
2. Visit https://whoer.net or https://ipleak.net to confirm proxy is active
3. Your browser traffic should now route through the configured proxy

---

## 🌐 Supported Regions

All 18 regions ship with **placeholder endpoints** (`*.proxy.example.com`).  
You can override any region in Settings:

| Region ID | City | Flag | Continent |
|-----------|------|------|----------|
| `us-nyc` | New York | 🇺🇸 | Americas |
| `us-lax` | Los Angeles | 🇺🇸 | Americas |
| `us-sfo` | San Francisco | 🇺🇸 | Americas |
| `us-was` | Washington D.C. | 🇺🇸 | Americas |
| `ca-tor` | Toronto | 🇨🇦 | Americas |
| `br-sao` | Sao Paulo | 🇧🇷 | Americas |
| `gb-lon` | London | 🇬🇧 | Europe |
| `de-fra` | Frankfurt | 🇩🇪 | Europe |
| `nl-ams` | Amsterdam | 🇳🇱 | Europe |
| `fr-par` | Paris | 🇫🇷 | Europe |
| `sg-sin` | Singapore | 🇸🇬 | Asia |
| `jp-tyo` | Tokyo | 🇯🇵 | Asia |
| `in-mum` | Mumbai | 🇮🇳 | Asia |
| `kr-sel` | Seoul | 🇰🇷 | Asia |
| `ae-dxb` | Dubai | 🇦🇪 | Asia |
| `id-jkt` | Jakarta | 🇮🇩 | Asia |
| `au-syd` | Sydney | 🇦🇺 | Oceania |
| `za-jnb` | Johannesburg | 🇿🇦 | Africa |

---

## 🛠️ Configuration

### Settings Page

Access via the popup → Settings icon, or `chrome://extensions` → VeilRoute details → Extension options.

**Gateway Configuration**
- Override any region with your own proxy host, port, scheme, credentials
- Supports `http`, `https`, `socks4`, `socks5`
- Username/password optional
- Click **Reset to default** to restore bundled placeholder

**WebRTC Leak Protection**
- Enable to set `webRTCIPHandlingPolicy` to `disable_non_proxied_udp`
- Prevents WebRTC from bypassing the proxy
- Recommended: **ON**

### State Persistence

All settings and connection state persist in `chrome.storage.local`.  
If the extension is enabled when you close the browser, it will **auto-reconnect on startup**.

---

## 🔒 Security & Privacy

### What VeilRoute Does

- **Proxies browser traffic**: Routes HTTP(S) through your configured server
- **Blocks WebRTC UDP**: Reduces WebRTC-based IP leakage
- **Persists auth in memory**: Credentials cached for proxy auth, not saved to disk
- **Validates inputs**: Scheme, host, port validation before applying proxy

### What VeilRoute Does NOT Do

- **Encrypt traffic**: The proxy operator can see your traffic (unless you use HTTPS sites)
- **Hide from websites**: Websites see the proxy IP, not your IP
- **Protect against fingerprinting**: Browser fingerprints are unchanged
- **Tunnel non-browser apps**: Only Chrome browser traffic is proxied
- **Provide anonymity**: Trust model assumes the proxy operator is honest

### Recommendations

1. **Use HTTPS proxy schemes** where possible (better than HTTP)
2. **Trust your proxy operator** — they can log your traffic
3. **Use HTTPS websites** — end-to-end encryption protects content
4. **Test for leaks** at https://ipleak.net after connecting
5. **Do not rely on this for sensitive anonymity** — use Tor Browser for that

---

## 💻 Development

### File Structure

```
src/
├── manifest.json         # MV3 manifest, v1.0.0
├── service-worker.js     # Background script, proxy control, state management
├── regions.js            # Region definitions, default state
├── popup.html/js         # Extension popup UI
├── options.html/js       # Settings page
├── styles.css            # Shared styles
└── icons/                # Extension icons (16/32/48/128)

backend-api/
├── openapi.yaml          # API contract for control plane
└── server-layout.md      # Architecture notes

docs/
├── installation.md       # Browser installation guide
├── architecture.md       # System design
└── privacy.md            # Privacy policy template
```

### Key Modules

- **service-worker.js**: Core logic for proxy enable/disable, region switching, auth, validation
- **regions.js**: 18-region array with endpoints, flags, metadata
- **popup.js**: UI state rendering, connect/disconnect, IP check
- **options.js**: Gateway configuration, region overrides, WebRTC toggle

### Message API

The service worker responds to these message types:

- `GET_STATE`: Returns current state + effective region list
- `SET_REGION`: Switch to a different region
- `SET_ENABLED`: Connect/disconnect proxy
- `SET_WEBRTC`: Toggle WebRTC leak protection
- `GET_REGION_CONFIGS`: Fetch all region configs + overrides
- `SAVE_REGION_CONFIG`: Save custom gateway for a region
- `RESET_REGION_CONFIG`: Reset region to bundled default
- `CHECK_IP`: Fetch visible IP via ipify

---

## 📦 Distribution

### Chrome Web Store

To publish to the Chrome Web Store:

1. **Prepare assets**:
   - Create 128x128 icon
   - Screenshot the popup + settings page
   - Write store description

2. **Package extension**:
   ```bash
   cd src/
   zip -r veilroute-proxy-v1.0.0.zip .
   ```

3. **Upload to Chrome Web Store Developer Dashboard**:
   - Privacy policy URL required
   - Disclose data usage (proxy settings, IP check)
   - Request `proxy`, `privacy`, `webRequest`, `webRequestAuthProvider` permissions

4. **Review checklist**:
   - Single-purpose: Browser proxy control
   - Minimal permissions: Only what's needed
   - Privacy: No user data sent to third parties

---

## 🛤️ Roadmap

### Backend Infrastructure (for commercial deployment)

- [ ] **Control-plane API**: Auth, subscriptions, region health, signed config delivery
- [ ] **Regional proxy gateways**: HTTPS CONNECT and SOCKS5 servers in each region
- [ ] **Monitoring**: Health probes, latency tracking, alerting
- [ ] **Abuse controls**: Rate limiting, credential rotation, IP blocklists

### Extension Enhancements

- [ ] **Signed region configs**: Fetch from API, verify signature
- [ ] **Auto-reconnect**: Retry on disconnect with exponential backoff
- [ ] **Connection quality**: Latency tests, bandwidth estimates
- [ ] **Split tunneling**: Bypass proxy for specific domains

### Compliance & Trust

- [ ] **Privacy policy**: Published, GDPR-compliant
- [ ] **Logging policy**: Transparent, no-logs vs minimal logs
- [ ] **Security audit**: Independent third-party review
- [ ] **Warrant canary**: Transparency report

---

## ❓ FAQ

**Q: Why do all regions show "Demo" status?**  
A: The bundled endpoints are placeholders (`*.proxy.example.com`). You must configure real proxy servers in Settings.

**Q: Can I use this with a commercial VPN service?**  
A: Yes, if they provide HTTPS or SOCKS proxy endpoints. Most consumer VPNs use OpenVPN/WireGuard, which this extension cannot control.

**Q: Does this work in Incognito mode?**  
A: Only if you enable "Allow in Incognito" in `chrome://extensions`. Proxy settings are separate per regular/incognito context.

**Q: Will this slow down my browser?**  
A: Performance depends on your proxy server's speed and location. Expect 10-200ms added latency.

**Q: Can websites detect I'm using a proxy?**  
A: Yes. Your IP will be the proxy's IP, which may be flagged by services like Netflix or banks.

**Q: Is my traffic encrypted?**  
A: Only if you use HTTPS sites or an `https` proxy scheme. The proxy operator can still see unencrypted HTTP traffic.

---

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 💬 Support

For bugs or feature requests, open an issue on GitHub.  
For production deployment questions, see `docs/architecture.md` and `backend-api/openapi.yaml`.

---

**Built by [@pangerlkr](https://github.com/pangerlkr)** • v1.0.0 Production Release
