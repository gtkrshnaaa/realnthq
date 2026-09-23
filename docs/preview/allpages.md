# realnthq: Visual Interface Catalogue

**Document Purpose:** Complete visual preview archive and interface index for the `realnthq` virtual office platform.
**Design System Baseline:** Warm Editorial Light (`#fbfbfa` canvas, Fraunces serif, DM Sans UI, solid obsidian actions, soft sage accents).
**Viewport Resolution:** 1920x1080 (16:9 Desktop Full-Fidelity).

---

## Archival Package Download

* **Complete Screenshot Bundle (ZIP)**: [Download realnthq.zip](./screenshots/zip/realnthq.zip)

---

## Table of Contents

* [01. Welcome Landing Page & Headquarters Hub](#01-landing-page)
* [02. Virtual Campus Floor & Desk Grid](#02-virtual-campus)
* [03. Meeting Spaces & Huddle Hubs](#03-meeting-rooms)
* [04. Decision Registers & Async Artifacts](#04-decision-logs)
* [05. Team Directory & Spatial Presence Roster](#05-team-directory)
* [06. Single Sign-On & Authentication Portal](#06-workspace-login)

---

## 01. Welcome Landing Page & Headquarters Hub

* **Route:** `/` ([http://localhost:3000/](http://localhost:3000/))
* **File:** [`docs/preview/screenshots/01-landing-page.jpg`](./screenshots/01-landing-page.jpg)
* **Core Components:** `Header`, `WelcomeBanner`, `DynamicOrgBadge`, `CampusStats`, `ActionGateways`, `FeatureHighlights`

![Welcome Landing Page & Headquarters Hub](./screenshots/01-landing-page.jpg)

> **Architecture & UI Note**: Dedicated self-hosted welcoming portal greeting team members of the host organization (e.g. RealntHQ Dev Squad) with dynamic company data, campus statistics, and direct action gateways powered by Realnt HQ.

---

## 02. Virtual Campus Floor & Desk Grid

* **Route:** `/campus` ([http://localhost:3000/campus](http://localhost:3000/campus))
* **File:** [`docs/preview/screenshots/02-virtual-campus.jpg`](./screenshots/02-virtual-campus.jpg)
* **Core Components:** `Header`, `FloorSelector`, `CampusGrid`, `DeskTile`, `PresenceRadar`, `RoomPanel`, `StatusSelector`

![Virtual Campus Floor & Desk Grid](./screenshots/02-virtual-campus.jpg)

> **Architecture & UI Note**: Interactive 2D virtual office canvas featuring multi-floor selection, real-time desk claims, status tags, spatial presence radar, and ad-hoc room huddles.

---

## 03. Meeting Spaces & Huddle Hubs

* **Route:** `/rooms` ([http://localhost:3000/rooms](http://localhost:3000/rooms))
* **File:** [`docs/preview/screenshots/03-meeting-rooms.jpg`](./screenshots/03-meeting-rooms.jpg)
* **Core Components:** `Header`, `ActiveHuddle`, `VideoIcon`, `MicIcon`, `UsersIcon`

![Meeting Spaces & Huddle Hubs](./screenshots/03-meeting-rooms.jpg)

> **Architecture & UI Note**: Collaborative rooms supporting P2P mesh and SFU gateway signaling, capacity tracking, active meeting indicators, and instant huddle provisioning.

---

## 04. Decision Registers & Async Artifacts

* **Route:** `/artifacts` ([http://localhost:3000/artifacts](http://localhost:3000/artifacts))
* **File:** [`docs/preview/screenshots/04-decision-logs.jpg`](./screenshots/04-decision-logs.jpg)
* **Core Components:** `Header`, `ArtifactFilter`, `DecisionCard`, `MarkdownViewer`

![Decision Registers & Async Artifacts](./screenshots/04-decision-logs.jpg)

> **Architecture & UI Note**: Persistent room-level markdown records, architectural decisions, and daily standup journals ensuring alignment across asynchronous and distributed team members.

---

## 05. Team Directory & Spatial Presence Roster

* **Route:** `/team` ([http://localhost:3000/team](http://localhost:3000/team))
* **File:** [`docs/preview/screenshots/05-team-directory.jpg`](./screenshots/05-team-directory.jpg)
* **Core Components:** `Header`, `TeamCard`, `StatusBadge`, `KnockTrigger`, `KnockModal`

![Team Directory & Spatial Presence Roster](./screenshots/05-team-directory.jpg)

> **Architecture & UI Note**: Comprehensive organizational roster showing member roles, desk locations, live availability indicators, and direct one-click soft knock collaboration.

---

## 06. Single Sign-On & Authentication Portal

* **Route:** `/login` ([http://localhost:3000/login](http://localhost:3000/login))
* **File:** [`docs/preview/screenshots/06-workspace-login.jpg`](./screenshots/06-workspace-login.jpg)
* **Core Components:** `LoginForm`, `SSOButtons`, `CampusBranding`, `PrivacyNotice`

![Single Sign-On & Authentication Portal](./screenshots/06-workspace-login.jpg)

> **Architecture & UI Note**: Enterprise authentication gate supporting Okta / SAML SSO, Google Workspace, GitHub Org, and direct magic-link login with zero-surveillance compliance.

---
