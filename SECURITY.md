# Security Policy

## Supported Versions

The following versions of VeilRoute Proxy are currently supported with security updates:

| Version | Supported          | End of Life     |
|---------|--------------------|------------------|
| 1.0.x   | :white_check_mark: | Active          |
| < 1.0   | :x:                | 2026-07-18      |

---

## Reporting a Vulnerability

**We take security vulnerabilities seriously.** If you discover a security issue in VeilRoute Proxy, please report it responsibly.

### How to Report

**DO NOT create a public GitHub issue for security vulnerabilities.**

Instead, please report via one of the following channels:

1. **Email**: security@veilroute.example.com (replace with actual email)
2. **GitHub Security Advisory**: Use the "Security" tab on this repository to privately report
3. **Encrypted Communication**: PGP key available at keybase.io/pangerlkr (if applicable)

### What to Include

Please provide as much information as possible:

- **Description**: Clear description of the vulnerability
- **Impact**: What an attacker could do if they exploit this
- **Steps to reproduce**: Detailed steps to trigger the vulnerability
- **Affected versions**: Which versions are impacted
- **Suggested fix**: If you have a proposed solution (optional)
- **Proof of concept**: Code or screenshots demonstrating the issue (optional)

### Response Timeline

| Stage | Timeline |
|-------|----------|
| Initial acknowledgment | Within 48 hours |
| Severity assessment | Within 5 business days |
| Fix development | Varies by severity |
| Security patch release | 7-30 days depending on severity |
| Public disclosure | 30-90 days after patch |

### Severity Classification

We use the following severity levels:

#### Critical (CVSS 9.0-10.0)
- Remote code execution
- Credential theft without user interaction
- Complete proxy bypass allowing traffic leakage
- WebRTC leak despite protection enabled

**Response**: Patch within 7 days, immediate disclosure after fix

#### High (CVSS 7.0-8.9)
- Authentication bypass
- Privilege escalation
- Sensitive data exposure (IP addresses, credentials)
- Cross-site scripting (XSS) in extension pages

**Response**: Patch within 14 days

#### Medium (CVSS 4.0-6.9)
- Denial of service affecting extension functionality
- Information disclosure (non-sensitive)
- State corruption requiring user intervention to fix

**Response**: Patch within 30 days

#### Low (CVSS 0.1-3.9)
- UI inconsistencies
- Non-security bugs
- Performance issues

**Response**: Fixed in next regular release

---

## Security Best Practices

### For Users

1. **Keep extension updated**: Enable automatic updates in Chrome
2. **Verify proxy operators**: Only connect to trusted proxy servers
3. **Use HTTPS websites**: Extension does not encrypt unencrypted HTTP traffic
4. **Check for IP leaks**: Test at ipleak.net after connecting
5. **Review permissions**: Understand what the extension can access
6. **Enable WebRTC protection**: Keep the setting enabled in options

### For Contributors

1. **Never commit secrets**: No API keys, passwords, or credentials in code
2. **Validate all inputs**: Especially user-provided proxy endpoints
3. **Use parameterized queries**: If adding database features later
4. **Avoid eval()**: Never use eval() or Function() constructor
5. **Content Security Policy**: Maintain strict CSP in manifest.json
6. **Minimize permissions**: Request only necessary Chrome permissions

---

## Known Security Limitations

### By Design

These are intentional limitations, not vulnerabilities:

| Limitation | Description | Mitigation |
|------------|-------------|------------|
| Browser-only tunneling | Does not proxy OS-level traffic | Use OS-level VPN for full device protection |
| Proxy operator trust | Operator can see unencrypted traffic | Use HTTPS websites, trust your proxy provider |
| No fingerprint protection | Browser fingerprint unchanged | Use Tor Browser for anonymity |
| IP visible to websites | Websites see proxy IP, not your IP | Expected behavior of a proxy |
| Credentials in memory | Proxy auth stored in memory while connected | Cleared on disconnect and browser close |

### WebRTC Leak Protection

The extension sets `webRTCIPHandlingPolicy` to `disable_non_proxied_udp`. This reduces but does not eliminate all WebRTC leaks:

- **Mitigated**: Direct UDP connections revealing real IP
- **Not mitigated**: TURN server leaks if server is misconfigured
- **Best practice**: Test at browserleaks.com/webrtc after connecting

### Chrome Extension Security Model

The extension operates within Chrome's security sandbox:

- **Cannot access**: Filesystem, native OS APIs, other extensions
- **Can access**: Browser proxy settings, chrome.storage, network requests
- **User consent required**: All permissions declared in manifest.json

---

## Security Audits

### Audit Status

| Audit Type | Status | Last Performed | Next Scheduled |
|------------|--------|----------------|----------------|
| Code review | Completed | 2026-07-18 | Ongoing |
| Penetration testing | Pending | N/A | 2026-Q4 |
| Third-party audit | Planned | N/A | 2027-Q1 |

### Audit Scope

Future security audits will cover:

- Extension code (manifest, service worker, UI)
- Proxy authentication and credential handling
- State management and persistence
- Input validation and sanitization
- Content Security Policy compliance
- Permission usage justification

---

## Vulnerability Disclosure Policy

We follow responsible disclosure:

1. **Private reporting**: Report privately, allow time for fix
2. **Coordinated disclosure**: We will work with you on disclosure timing
3. **Public acknowledgment**: Security researchers will be credited (unless they prefer anonymity)
4. **CVE assignment**: Critical/High severity issues may receive CVE identifiers
5. **Security advisory**: Published on GitHub after patch release

### Hall of Fame

We acknowledge security researchers who help improve VeilRoute:

- (No vulnerabilities reported yet)

---

## Security Contacts

- **Security issues**: security@veilroute.example.com
- **General inquiries**: Use GitHub issues (non-security topics only)
- **PGP key**: Available on request

---

## Changelog

### 2026-07-18
- Initial security policy published
- v1.0.0 production release
- Established vulnerability reporting process

---

**Last updated**: 2026-07-18  
**Policy version**: 1.0
