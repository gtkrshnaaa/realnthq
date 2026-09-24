# REALNT HQ: Web Pages & Routes Master Specification

## 1. Overview & Single-Page Application (SPA) Router Architecture

REALNT HQ is architected as a Next.js App Router application designed around low-latency client-side transitions and persistent state preservation (e.g., active audio call does not disconnect when navigating between pages).

This document details every page, route, sub-view, modal, and socket contract that developers must build into the platform.

---

## 2. Master Route Catalog

| Route Path | Page Title | Primary Purpose | Key User Personas |
| :--- | :--- | :--- | :--- |
| `/` | Workplace Welcome Portal | Quick status overview, jump links, active squad counts, login redirect | All authenticated members & visitors |
| `/office` | Spatial Office Canvas | 2D desk layout, focus pods, desk sticky notes, proximity radar | Engineers, Designers, All ICs |
| `/rooms` | Collaboration Rooms Hub | Multi-party WebRTC audio/video rooms, incident war rooms, whiteboards | Squads, War Room Teams, Cross-functional |
| `/broadcasts` | Townhall & Announcements | Live amphitheater streams, company-wide announcements, CEO AMAs | All hands, Leadership, Event Producers |
| `/standup` | Async Daily Standup Kiosk | Daily check-in form (yesterday/today/blockers), squad pulse log | Engineers, PMs, EMs, All Squads |
| `/team` | Directory & Org Chart | Departmental taxonomy, role directory, skill tags, direct knock | All employees, People Ops, Managers |
| `/artifacts` | Decision Logs & Knowledge Vault | Architecture Decision Records (ADRs), meeting notes, whiteboard logs | Tech Leads, Architects, PMs, Auditors |
| `/telemetry` | Platform Telemetry & Health | Socket latency, WebRTC SFU bitrates, presence mesh status, audit logs | SREs, System Admins, DevOps |
| `/admin` | Workspace Governance Console | Member provisioning, department setup, floor editor, security audit | Workspace Admins, Operations Managers |
| `/lobby` | Guest Reception & Hospitality | External visitor arrival, guest pass validation, escort holding area | Enterprise Clients, Candidates, Hosts |
| `/login` | Authentication & Instance Setup | Passwordless magic links, local credentials, initial instance bootstrap | All users |

---

## 3. Detailed Route Specifications

### 3.1 Route: `/office` (Spatial Office Canvas)

* **Purpose:** The core spatial co-presence workspace where team members visualize colleagues at desks, initiate focus sessions, and interact via ambient proximity.
* **Core Functional Requirements:**
  1. **2D Canvas Rendering:** Isometric or orthogonal top-down grid displaying desks, focus pods, partitions, and communal areas.
  2. **Desk Claim & Release:** Users can click an unoccupied desk to claim it (`DEDICATED` or `HOT_DESK`) or release when departing.
  3. **Personalized Desk Sticky Notes:** Occupants can stick a short text note to their desk (e.g., "In customer interview until 3 PM") visible on hover.
  4. **Proximity Audio Zones:** Audio volume attenuates based on geometric Euclidean distance between active avatars on the same floor.
  5. **Desk Tray & Knock Buffering:** When in `DEEP_WORK` mode, incoming desk knocks are quietly stored in a bottom drawer tray instead of chiming.
* **Component Inventory:**
  * `OfficeGrid`: Main visual 2D floor canvas.
  * `DeskTile`: Individual desk element with occupant avatar, badge, and note trigger.
  * `FloorSelector`: Tab bar to switch between floor elevations and horizontal wings.
  * `FocusModeModal`: Timer duration picker (15m, 25m, 50m, 90m) and goal input.
  * `BufferedKnockDrawer`: Collapsible tray listing queued knocks with 1-click reply.
* **Socket Contracts:**
  * `office:desk:claim` / `office:desk:claimed`
  * `office:desk:release` / `office:desk:released`
  * `office:knock:send` / `office:knock:received` / `office:knock:buffered`

---

### 3.2 Route: `/rooms` (Collaboration Rooms Hub)

* **Purpose:** Synchronous audio, video, screen share, and whiteboard collaboration environments for multi-user squads.
* **Core Functional Requirements:**
  1. **Room Types:**
     * `HUDDLE`: Low-latency 2-8 person quick squad sync.
     * `CONFERENCE`: Formal meeting room with agenda notes and screen sharing (up to 25 people).
     * `WAR_ROOM`: High-priority incident room with telemetry webhooks and severity banner.
     * `WATERCOOLER`: Casual drop-in audio lounge with persistent ambient background.
  2. **Persistent Whiteboards:** Vector sketchpad with shapes, arrows, text, and 1-click "Export as ADR / Decision Log" button.
  3. **Multi-Stream Screen Sharing:** Multiple users can share screens concurrently with side-by-side comparison.
* **Component Inventory:**
  * `RoomPanel`: Grid listing active rooms, current occupant count, and room status.
  * `ActiveHuddle`: Floating or full-screen video/audio suite with participant tiles.
  * `WhiteboardModal`: Canvas component with drawing tools, sticky notes, and text.
* **Socket Contracts:**
  * `room:join` / `room:joined` / `room:leave` / `room:peer_joined`
  * `room:signal` (WebRTC offer, answer, ICE candidates)
  * `whiteboard:update` / `whiteboard:synced`

---

### 3.3 Route: `/broadcasts` (Company-Wide Townhall & Announcements)

* **Purpose:** High-capacity broadcast stage for company all-hands, CEO addresses, and pinned company announcements.
* **Core Functional Requirements:**
  1. **Stage vs Audience Roles:** Stage speakers have unmuted audio/video feeds; audience members are in listen-only mode.
  2. **Hand-Raise Queue:** Audience members can click "Raise Hand" to request temporary stage speaking privileges.
  3. **Moderated Q&A Panel:** Text question queue where attendees upvote questions and hosts mark them as answered.
  4. **Company Bulletin Newsfeed:** Right-hand portal showing pinned company notices, milestone celebrations, and policy changes.
* **Component Inventory:**
  * `BroadcastStage`: Main video player rendering current keynote speaker or presentation.
  * `HandRaiseQueue`: Moderator toolbar displaying queue of pending speakers.
  * `QaDrawer`: Upvotable question board.
  * `BulletinPanel`: Live announcements feed with urgency badges (`CRITICAL`, `ANNOUNCEMENT`, `UPDATE`).

---

### 3.4 Route: `/standup` (Asynchronous Daily Standup Kiosk)

* **Purpose:** Daily asynchronous check-in system replacing lengthy morning status meetings.
* **Core Functional Requirements:**
  1. **Daily Check-in Composer:** Structured 3-field submission form:
     * Yesterday: What was accomplished.
     * Today: What is planned.
     * Blockers: Any impediments flagging immediate squad assistance.
  2. **Squad Filter & Feed:** View updates filtered by department or squad (e.g. Engineering, Design, Core Platform).
  3. **Blocker Resolution Thread:** Teammates can reply directly to blocker flags with offer-help buttons.
* **Component Inventory:**
  * `StandupComposer`: Check-in form modal or card.
  * `StandupFeed`: Chronological card stream of team submissions with date picker.
  * `BlockerSummaryBanner`: Highlighted header section alerting managers to active blockers.

---

### 3.5 Route: `/team` (Team Directory & Org Taxonomy)

* **Purpose:** Searchable personnel directory, organizational hierarchy, and direct communication dispatcher.
* **Core Functional Requirements:**
  1. **Department Clustering:** Group employees by department (`ENGINEERING`, `PRODUCT`, `DESIGN`, `REVENUE`, `PEOPLE_OPS`, `EXECUTIVE`).
  2. **Live Presence Badges:** Real-time indicator showing if user is `AVAILABLE`, `DEEP_WORK`, `IN_MEETING`, or `OFFLINE`.
  3. **Location Teleportation:** Clicking user location navigates directly to their current desk on `/office` or room on `/rooms`.
  4. **1-Click Knock Dispatcher:** Send an immediate knock message directly from the directory card.
* **Component Inventory:**
  * `TeamDirectoryTable`: Searchable, filterable list of all employees.
  * `UserProfileCard`: Expanded profile view with email, title, skills, desk location, and knock button.
  * `DepartmentFilter`: Filter pills for rapid squad isolation.

---

### 3.6 Route: `/artifacts` (Decision Logs & Knowledge Vault)

* **Purpose:** Archival repository for Architecture Decision Records (ADRs), whiteboard exports, and incident post-mortems.
* **Core Functional Requirements:**
  1. **ADR Markdown Viewer/Editor:** Read and edit structured architectural records (Status, Context, Decision, Consequences).
  2. **Whiteboard Snapshot Archive:** Historical gallery of diagrams exported from meeting rooms.
  3. **Search & Tagging:** Full-text search and tagging by system subsystem (e.g. `storage`, `webrtc`, `auth`, `rbac`).
* **Component Inventory:**
  * `ArtifactCatalog`: Grid/table of published decisions and sketches.
  * `AdrDetailModal`: Clean Markdown reader with revision history.

---

### 3.7 Route: `/telemetry` (Platform Health & Operations)

* **Purpose:** Real-time visibility into self-hosted server health, WebRTC SFU performance, and active user distribution.
* **Core Functional Requirements:**
  1. **Socket Connection Latency:** Real-time ping/pong latency graph and active socket count.
  2. **WebRTC Mesh Bitrates:** Audio/video bandwidth utilization per active room.
  3. **Audit Log Stream:** Real-time event log tracking authentication events, desk claims, and administrative actions.
* **Component Inventory:**
  * `LatencyRadarCard`: Numerical and sparkline latency monitor.
  * `ActiveConnectionsTable`: Connected IP addresses, browser agents, and room allocations.
  * `AuditLogTable`: Paginated audit log with security export.

---

### 3.8 Route: `/admin` (Workspace Governance Console)

* **Purpose:** Workspace configuration, employee provisioning, role assignment, and floor plan customization.
* **Core Functional Requirements:**
  1. **Member Management:** Invite new employees, assign roles (Admin, Member, Contractor, Auditor), deactivate accounts.
  2. **Department Management:** Create custom departments and assign department leads.
  3. **Security Settings:** Configure session expiry, guest pass policies, and enforce 2FA.

---

### 3.9 Route: `/lobby` (Guest Reception & Hospitality)

* **Purpose:** Sandboxed waiting room where external clients, interview candidates, and auditors arrive.
* **Core Functional Requirements:**
  1. **Access Code Validation:** Visitors input a 6-digit access code (e.g., `REALNT-9482`) to enter.
  2. **Host Alerting:** System alerts the internal host (e.g. "Jane Doe has arrived in Reception").
  3. **Host Escort Action:** Host clicks "Escort Guest" to teleport the visitor directly into the target meeting room.
