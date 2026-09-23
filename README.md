# realntoffice

An adaptive open-source virtual office platform engineered for low-scale to high-scale organizations conducting fully remote workplace operations.

---

## 1. Overview and Core Vision

`realntoffice` bridges the gap between chaotic video call fatigue and disconnected asynchronous isolation. It provides remote teams with fluid spatial presence, ambient awareness, instant ad-hoc collaboration ("soft knocks"), and persistent async meeting logs without invasive employee surveillance or keylogger spyware.

### Scale Continuum
* **Micro Scale (1 to 15 members)**: Single flat floor, unified open desks, peer-to-peer WebRTC audio/video mesh.
* **Mid Scale (15 to 150 members)**: Multi-department floors, scheduled meeting rooms, focus pods, single Selective Forwarding Unit (SFU).
* **Enterprise Scale (150 to 10,000+ members)**: Multi-floor digital campuses, spatial quadtree interest management, clustered media servers, Redis pub/sub, and role-based access control.

---

## 2. Repository Layout

Per strict architectural constraints, the repository root enforces a clean, modular structure:

```text
realntoffice/
├── README.md              # Project overview, architecture, and orchestration guides
├── LICENSE                # Open source MIT license
├── docs/                  # PRD, architectural diagrams, and pattern matrices
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── RIGHT_AND_ANTI_PATTERNS.md
│   └── docs_manifest.json
├── client/                # Next.js 15 frontend (Tailwind CSS, Warm Editorial Light design)
├── server/                # NestJS 11+ backend (REST API, WebSockets, Domain Modules)
├── databases/             # PostgreSQL DDL schemas, migrations, and campus seeds
│   ├── 01_init.sql
│   ├── 02_tables.sql
│   └── 03_seed.sql
├── tests/                 # Automated test suites (Puppeteer E2E, Domain Integration)
│   ├── e2e/
│   ├── integration/
│   └── run_tests.sh
├── scripts/               # Operational utility scripts (screenshot crawler, docs builder)
│   ├── screenshot_crawler.js
│   ├── docs_builder.js
│   └── health_validator.sh
└── deployment/            # Docker containers & single-enter orchestration scripts
    ├── Dockerfile.client
    ├── Dockerfile.server
    ├── docker-compose.yml
    ├── deploy.sh
    └── redeploy.sh
```

---

## 3. Technology Stack

* **Frontend Client (`client/`)**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide icons, Socket.IO client.
* **Backend Server (`server/`)**: NestJS 11+, TypeScript, WebSockets Gateway, Class-Validator, PostgreSQL connection pool.
* **Database Layer (`databases/`)**: PostgreSQL 16 with UUID, pgcrypto, citext extensions, and structured relational seed datasets.
* **End-to-End Testing (`tests/`)**: Puppeteer headless browser automation and deterministic domain integration tests.
* **Orchestration (`deployment/`)**: Multi-stage Docker containers, Docker Compose, and single-enter Bash scripts (`deploy.sh`, `redeploy.sh`).

---

## 4. Right Patterns vs. Anti-Patterns

| Domain | Right Flow (Standard) | Anti-Pattern (Prohibited) |
| :--- | :--- | :--- |
| **Presence Tracking** | Ambient status tags (`Focusing`, `Available`, `In Meeting`) with debounced 30s heartbeats. | Keystroke counting, periodic webcam snapshots, mouse movement heatmaps. |
| **Ad-Hoc Sync** | Soft knock protocol with polite non-intrusive sound cue and opt-in acceptance modal. | Auto-unmuting forced drop-ins or calendar invite spam for 2-minute questions. |
| **Real-Time Data** | Spatial quadtree partitioning; room-scoped pub/sub channels. | Global unpartitioned broadcast of cursor coordinates across 10,000 users. |
| **Media Routing** | Decoupled SFU media servers (Mediasoup / LiveKit) controlled via signaling. | Ingesting and transcoding WebRTC RTP packets directly in the primary API process. |
| **Documentation** | Room-level persistent markdown journals and decision registers. | Purely verbal ephemeral meetings where absent members lose context. |

For the complete specification, read [docs/RIGHT_AND_ANTI_PATTERNS.md](docs/RIGHT_AND_ANTI_PATTERNS.md).

---

## 5. Design System Baseline (Warm Editorial Light)

`realntoffice` applies the universal **Warm Editorial Light** aesthetic:
* **Canvas**: `#fbfbfa` warm bone background with alternating organic cards.
* **Typography**: Dual-font pairing with `'Fraunces'` serif headlines and `'DM Sans'` body text.
* **Structure**: 1px hairline borders (`border-black/8`), `rounded-2xl` cards, `rounded-xl` interactive controls.
* **Form Controls**: Themed select dropdowns, custom SVG icons, and themed checkboxes.
* **Action Buttons**: Solid obsidian black (`bg-[#252724] hover:bg-[#3b3e39] text-white`).
* **Accents**: Soft organic sage accents (`#eef2ec` chips, `#e7f2e4` badges, `#5a8357` checkmarks).
* **Policy**: Zero raw emojis and zero em dashes throughout all code and UI components.

---

## 6. Quickstart and Single-Enter Orchestration

### Prerequisites
* Docker and Docker Compose plugin installed
* Node.js v20+ (for local development outside containers)

### 1. One-Enter Deployment
To bootstrap the entire multi-container environment (PostgreSQL, Redis, NestJS server, and Next.js client):
```bash
./deployment/deploy.sh
```

Once running:
* **Client Dashboard**: [http://localhost:3000](http://localhost:3000)
* **Server REST API**: [http://localhost:4000](http://localhost:4000)
* **Health Check**: [http://localhost:4000/health](http://localhost:4000/health)
* **Default Admin**: `admin@acme.org` / `password123`

### 2. Zero-Friction Redeployment
To reset local changes, pull latest branch updates, and restart services:
```bash
./deployment/redeploy.sh
```

---

## 7. Automated Testing and Verification

Run the unified test runner:
```bash
cd tests
./run_tests.sh
```
Or trigger specific test suites:
```bash
cd tests
npm run test:integration  # Domain state machine & zone isolation tests
npm run test:e2e          # Puppeteer browser automation tests
```

---

## 8. Operational Utilities

* **Screenshot Crawler**: Captures 1920x1080 route screenshots to `docs/preview/screenshots/`:
  ```bash
  node scripts/screenshot_crawler.js
  ```
* **Docs Builder**: Aggregates documentation metadata and generates `docs/docs_manifest.json`:
  ```bash
  node scripts/docs_builder.js
  ```
* **Environment Validator**: Validates host environment dependencies:
  ```bash
  ./scripts/health_validator.sh
  ```

---

## 9. License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
