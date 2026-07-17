# VeilRoute Proxy

VeilRoute is a browser-only proxy/VPN-style extension prototype for Chromium browsers. It has an interactive popup, multi-region selection, proxy toggling, visible IP check, WebRTC leak-reduction setting, and a backend/API architecture package for turning the prototype into a real service.

## What This Can And Cannot Do

This extension can control Chrome's browser proxy settings through the `chrome.proxy` extension API. That means proxied browser traffic can appear to originate from the chosen proxy region when real proxy servers are configured.

This extension cannot, by itself, be a full device-level VPN. It will not tunnel traffic from other apps, replace WireGuard/OpenVPN/IKEv2, hide account identity, defeat browser fingerprinting, or protect against an untrusted proxy operator.

## Run The Prototype

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Choose "Load unpacked".
4. Select the `src` folder in this package.
5. Open the extension popup.
6. Open Settings and configure at least one region with a real proxy host, port, and optional credentials.

The checked-in endpoints are placeholders under `*.proxy.example.com`. The extension intentionally blocks connection for those demo endpoints so it does not claim protection without a real gateway. Configure real endpoints in the options page (stored in local extension storage), or replace defaults in `src/regions.js`.

For browser-specific installation steps (Chrome, Edge, Brave/Opera/Vivaldi, and Firefox compatibility status), see `docs/browser-installation.md`.

## Files

- `src/manifest.json`: Manifest V3 extension config.
- `src/service-worker.js`: Proxy enable/disable, region switching, auth handling, WebRTC policy, IP check.
- `src/popup.html`, `src/popup.js`, `src/styles.css`: Interactive extension UI.
- `src/options.html`, `src/options.js`: Settings screen.
- `backend-api/openapi.yaml`: Control-plane API contract.
- `docs/architecture.md`: Multi-region server layout and production design.
- `docs/browser-installation.md`: Browser installation steps and compatibility notes.
- `docs/security-privacy.md`: Privacy boundaries, leak risks, and hardening checklist.

## Production Path

For a production privacy product, pair this extension with:

- A control-plane API for auth, subscriptions, server health, and signed region configs.
- Regional proxy gateways running hardened HTTPS CONNECT and SOCKS5 services.
- Optional OS-native VPN apps for full-device tunneling.
- Independent audits, transparent logging policies, and clear user-facing privacy claims.
