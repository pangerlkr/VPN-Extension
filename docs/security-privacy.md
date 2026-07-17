# Security And Privacy Notes

## Honest Claims

Safe product language:

- "Routes browser traffic through selected proxy regions."
- "Helps mask your visible browser IP from websites."
- "Can reduce WebRTC direct-IP exposure in Chrome."

Avoid claiming:

- "Complete anonymity."
- "Military-grade invisibility."
- "Hides every network on the device."
- "Prevents all tracking."

## Leak Risks

- Browser fingerprinting can still correlate users.
- Logged-in accounts can reveal identity regardless of IP.
- WebRTC behavior varies by browser and policy support.
- DNS handling depends on browser, proxy mode, and gateway implementation.
- Non-browser apps are outside this extension's protection.
- A malicious or compromised proxy operator can observe traffic metadata and non-TLS content.

## Extension Hardening

- Request only required permissions.
- Keep credentials in `chrome.storage.local`, never `sync`.
- Prefer short-lived credentials fetched after user authentication.
- Avoid remote code execution and dynamic script loading.
- Treat region metadata from the API as untrusted until signature verification passes.
- Add automated tests for proxy config generation and state transitions.

## Gateway Hardening

- Run gateways in isolated accounts or projects per region.
- Disable shell access where possible.
- Patch base images automatically.
- Use mTLS between control plane and health endpoints.
- Encrypt logs at rest and enforce short retention.
- Apply rate limits for spam, scraping, credential stuffing, and DDoS amplification.
