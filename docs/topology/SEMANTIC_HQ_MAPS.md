# REALNT HQ: Semantic Functional Topology Blueprint

## 1. System Vision & Paradigm Shift

REALNT HQ is a self-hosted distributed web workplace, not a concrete physical building. 
The **HQ Map** is therefore not an architectural rendering of concrete floors, drywall partitions, or fire stairs. Instead, it is a **live functional and semantic topology map** that tracks real-time human presence, routing locations, active collaboration contexts, and organizational clusters across the web application.

```
                     +---------------------------------------+
                     |         REALNT HQ WEB PLATFORM        |
                     +---------------------------------------+
                                        |
       +--------------------------------+-------------------------------+
       |                                                                |
[ Horizontal Axis: Feature Routes ]           [ Vertical Axis: Operational Tiers ]
- /office     : Spatial canvas & focus desks  - Tier 1: Solitary Deep Work (Desk focus)
- /rooms      : Synchronous huddle suites     - Tier 2: Micro-Pairing (1-on-1 knock)
- /broadcasts : Company-wide townhalls        - Tier 3: Squad Huddles (War rooms)
- /standup    : Async daily check-in kiosk    - Tier 4: Macro All-Hands (Broadcasts)
- /team       : People & department taxonomy  - Tier 5: Governance & Telemetry
- /artifacts  : Decision records & whiteboards
```

---

## 2. Horizontal Vector: Application Feature Domains & Routes

The horizontal axis represents the functional capability domains distributed across the web platform's single-page application router:

| Route Path | Functional Domain | Primary Activities | Active Artifacts |
| :--- | :--- | :--- | :--- |
| `/office` | Spatial Canvas & Desks | Individual execution, focus pod booking, proximity radar, desk sticky notes | Focus Pods, Hot Desks, Assigned Desks |
| `/rooms` | Real-Time Collaboration | Synchronous video/audio huddles, architecture war rooms, pair programming | WebRTC mesh, Shared Canvas, Screen Share |
| `/broadcasts` | Macro Org Communications | Executive townhalls, company-wide announcements, pinned bulletins | Live Stream, Pinned News Ticker, Q&A |
| `/standup` | Asynchronous Kiosk | Daily check-ins (yesterday, today, blockers), sprint pulse | Check-in Archive, Blocker Flagging |
| `/team` | Directory & Taxonomy | Org chart, role directory, department taxonomy, skills index | User Profiles, Department Badges |
| `/artifacts` | Knowledge & Memory | Architecture decision records (ADRs), meeting minutes, whiteboards | Markdown Notes, System Schematics |
| `/telemetry` | Platform Operations | WebRTC health, socket connection latency, presence heartbeat | Live Latency Graph, Active Socket Count |

---

## 3. Vertical Vector: Operational Interaction Tiers

The vertical axis defines the depth of human interaction and operational hierarchy, from solitary deep work up to workspace-wide governance:

```
+-----------------------------------------------------------------------------------+
| Tier 5: Platform Governance & Telemetry                                           |
| Scope: Workspace administrators, audit logs, system telemetry, role provisioning  |
+-----------------------------------------------------------------------------------+
| Tier 4: Company-Wide Macro Sync                                                   |
| Scope: All-hands broadcasts, global townhall Q&A, company-wide bulletin feed      |
+-----------------------------------------------------------------------------------+
| Tier 3: Cross-Functional Squad Collaboration                                      |
| Scope: Named huddle rooms, whiteboard sessions, sprint design reviews             |
+-----------------------------------------------------------------------------------+
| Tier 2: Micro-Pairing & Ad-Hoc Huddle                                             |
| Scope: 1-on-1 desk knocks, instantaneous audio tunnel, pair-programming session   |
+-----------------------------------------------------------------------------------+
| Tier 1: Individual Solitary Flow                                                  |
| Scope: Focused IC at desk, distraction shield enabled, incoming knocks buffered  |
+-----------------------------------------------------------------------------------+
```

### Operational Tier Definitions

1. **Tier 1: Individual Solitary Flow**
   * **State:** User is in deep-work mode (`DEEP_WORK`) or available at desk (`AVAILABLE`).
   * **Location:** Assigned or hot desk on `/office`.
   * **Behavior:** Notifications buffered in Desk Tray, focus timer active, proximity muted.

2. **Tier 2: Micro-Pairing & Ad-Hoc Huddle**
   * **State:** User initiates or receives a desk knock.
   * **Location:** Dual-user peer channel initiated from `/office`.
   * **Behavior:** Low-latency audio connection between 2 users without scheduling a formal room.

3. **Tier 3: Cross-Functional Squad Collaboration**
   * **State:** Multi-user synchronous meeting (`IN_MEETING`).
   * **Location:** Named room inside `/rooms` (e.g., Lovelace Sync Hub, Turing War Room).
   * **Behavior:** Multi-party WebRTC audio/video mesh, collaborative whiteboards, screen sharing.

4. **Tier 4: Company-Wide Macro Sync**
   * **State:** Broadcast audience or stage speaker.
   * **Location:** Global broadcast portal `/broadcasts` or bulletin portal.
   * **Behavior:** 1-to-many audio/video stream, live emoji-free text chat, priority announcements.

5. **Tier 5: Platform Governance & Telemetry**
   * **State:** Workspace administrative oversight.
   * **Location:** Telemetry inspector, visitor guest pass console, audit logs.
   * **Behavior:** Monitoring socket heartbeat, latency thresholds, role permissions.

---

## 4. Semantic Location Addressing Standard

Every active entity in REALNT HQ is addressable via a uniform semantic URI scheme:

```
REALNT://{routePath}/{contextIdentifier}@{tierLevel}?dept={departmentCode}
```

### Examples:
* `REALNT:///office/desk-eng-01@tier1?dept=ENGINEERING`
  User working at engineering desk 01 in solo flow.
* `REALNT:///rooms/room-turing-war-room@tier3?dept=ENGINEERING`
  Squad gathered in Turing War Room for an architecture sync.
* `REALNT:///broadcasts/all-hands-2026-q3@tier4?dept=ALL`
  Company-wide townhall in session.
* `REALNT:///standup/daily-checkin@tier1?dept=PRODUCT`
  Product manager logging daily standup status.

---

## 5. Live Functional Map UI (Radar & Wayfinding HUD)

The **Semantic HQ Map** is rendered in the web client as a persistent, high-density HUD modal:

1. **Global Presence Radar:** Real-time counts of active members across each route (`/office`, `/rooms`, `/broadcasts`, `/standup`, `/team`).
2. **Departmental Filter Matrix:** Instant toggling by department (Engineering, Product Design, Revenue/Sales, People Ops, Leadership).
3. **1-Click Teleportation:** Clicking any sector card automatically triggers client-side router navigation (`router.push('/rooms?room=...')`) to teleport the user directly into that workspace context.
4. **Context Activity Badges:** Visual indicators denoting `Screen Share Active`, `Whiteboard Active`, `Mic Open`, `Deep Work Locked`.

This ensures that team members always have instant situational awareness of where colleagues are working, what rooms are buzzing with activity, and how the distributed organization is functioning in real time.
