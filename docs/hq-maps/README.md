# REALNT HQ: Product & Engineering Master Blueprint (HQ Maps)

## Executive Overview & Architectural Purpose

This directory serves as the **Master Development Blueprint and Architectural Map** for `REALNT HQ`. 
It establishes the exhaustive engineering requirements, departmental organizational hierarchy, complete page-and-route catalog, and digital workplace facilities necessary to build a production-grade, self-hosted virtual headquarters.

Any developer contributing to REALNT HQ must reference these specifications to understand:
1. **What REALNT HQ Accommodates:** The complete scale and functional scope of an enterprise virtual workplace.
2. **Roles & Job Titles:** Every position across executive, engineering, product, sales, marketing, and HR functions.
3. **Pages & Routes:** Every web screen, route, view state, and modal that must be implemented.
4. **Workplace Facilities:** Digital equivalents of physical office infrastructure (desks, focus pods, whiteboards, war rooms, lounges, all-hands stages, guest portals).
5. **Permissions & RBAC:** Access control matrix determining what each role can access and execute.

---

## Blueprint Index

| Document | Primary Focus | Scope & Contents |
| :--- | :--- | :--- |
| [ROLES_AND_TITLES_SPEC.md](./ROLES_AND_TITLES_SPEC.md) | Roles & Job Titles | 7 departments, 30+ job titles, daily workflows, communication rules |
| [PAGES_AND_ROUTES_SPEC.md](./PAGES_AND_ROUTES_SPEC.md) | Pages & Routes Catalog | 11 core application routes, sub-views, component hierarchies, socket events |
| [WORKPLACE_FACILITIES_SPEC.md](./WORKPLACE_FACILITIES_SPEC.md) | Virtual Facilities | 10 digital workplace facilities (desks, focus pods, war rooms, stage, trays) |
| [RBAC_AND_SECURITY_MATRIX.md](./RBAC_AND_SECURITY_MATRIX.md) | Security & Permissions | Granular RBAC matrix mapping roles to routes, facilities, and actions |

---

## Core Engineering Principles

1. **Self-Hosted Autonomy:** Zero reliance on proprietary SaaS backends. All video, audio, presence, and chat run on open-source, self-hosted primitives (WebSockets, WebRTC SFU, PostgreSQL, Redis).
2. **Anti-Surveillance Co-Presence:** Spatial visibility reflects ambient co-presence, never keystroke monitoring, webcam spyware, or screen scraping.
3. **Context-Preserving Deep Work:** Focus modes isolate members while queuing interactions into asynchronous desk trays, preventing calendar fatigue.
4. **Multi-Disciplinary Accommodation:** Balanced tooling that equally serves engineers (ADRs, war rooms, terminal themes), designers (critique canvases), sales (demo suites), and executives (governance boardrooms).
