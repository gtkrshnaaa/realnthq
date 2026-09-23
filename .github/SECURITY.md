# Security Policy

## 1. Supported Versions

We release patches and security fixes for the active major release versions of `realnthq`.

| Version | Supported | Security Maintenance |
| :--- | :--- | :--- |
| `1.x.x` | Yes | Active Security Fixes |
| `< 1.0.0` | No | Upgrade to latest stable release |

---

## 2. Reporting a Vulnerability

The `realnthq` team takes the security of virtual workplace infrastructure seriously. If you discover a security vulnerability, please do NOT create a public GitHub issue.

Instead, please report vulnerabilities privately:
1. **GitHub Security Advisory**: Navigate to the repository's "Security" tab and click "Report a vulnerability" (recommended).
2. **Direct Maintainer Email**: Contact the security triage team at `security@realnthq.org`.

### What to Include in Your Report
To help us triage and resolve the issue quickly, please include:
* Description of the vulnerability and its potential impact.
* Step-by-step instructions to reproduce the issue (proof-of-concept scripts or requests).
* Affected components (`client/`, `server/`, `databases/`, or WebSocket gateway).
* Any potential mitigations you have identified.

---

## 3. Vulnerability Response Timeline

* **Initial Acknowledgment**: Within 48 hours of report submission.
* **Triage Assessment & Severity Assignment**: Within 5 business days.
* **Remediation Release & Public Disclosure**: Coordinated disclosure within 30 days of confirmed fix.

We credit security researchers who adhere to responsible disclosure in our release notes.
