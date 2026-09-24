# Product Requirements Document (PRD)

## Project: realnthq
**Document Version:** 1.0.0  
**Target Release:** Open Source V1  
**Status:** Approved  
**Author:** @gtkrshnaaa  

---

## 1. Executive Summary

`realnthq` is an open-source, scalable virtual office platform designed to support fully online workplace collaboration across organizations of any scale, from 2-person agile startups to 10,000+ member distributed enterprises.

Remote work often degrades into either endless calendar fatigue (constant Zoom/Meet marathons) or disengaged asynchronous isolation. Existing virtual office tools suffer from two extremes: lightweight toy avatars that break down past 20 users, or invasive surveillance suites that monitor keystrokes and capture periodic webcams.

`realnthq` bridges this divide through:
1. **Adaptive Scalability**: Automatically shifting communication topologies from peer-to-peer WebRTC mesh (small teams) to clustered SFU media servers and spatially sharded pub/sub channels (enterprises).
2. **Ambient Spatial Presence**: Providing peripheral awareness of team activity without creepy keystroke loggers or forced video streams.
3. **Frictionless Ad-Hoc Interaction**: Enabling natural "walk-by knocks", ambient co-working zones, and instant huddles.
4. **First-Class Async Integration**: Tying synchronous conversations directly to persistent, queryable action items and room logs.

---

## 2. Product Vision and Target Scale Continuum

| Tier | Team Size | Spatial Topology | Media Ingestion | Persistence & Pub/Sub |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Micro** | 1 - 15 members | Single flat floor, unified open desks, board room | WebRTC P2P Mesh | In-Memory / PostgreSQL Single Instance |
| **Tier 2: Mid** | 15 - 150 members | Multi-department floors, scheduled rooms, focus pods | Single Selective Forwarding Unit (SFU) | Redis Pub/Sub + PostgreSQL |
| **Tier 3: Enterprise** | 150 - 10,000+ | Multi-floor headquarters, custom zones, tenant isolation | Clustered Mediasoup/LiveKit SFUs | Distributed Redis Cluster + Sharded Postgres |

---

## 3. Explicit Right Patterns and Flows

To establish clear engineering and product standards, every core feature has an explicit right pattern:

### 3.1 Right Flow 1: Ambient Spatial Presence (Non-Intrusive)
* **Principle**: Psychological safety and focus must be preserved. Presence signifies availability, not surveillance.
* **Flow**:
  1. Member checks into the virtual office via SSO or session token.
  2. Member claims a desk or enters a dedicated zone (e.g., Focus Zone, Pair Programming Pod, Watercooler, Lounge).
  3. Status radiates to colleagues within the spatial scope via debounced WebSockets (heartbeat intervals every 30s).
  4. Status displays discrete states: `Available`, `Focusing (Do Not Disturb)`, `In Quick Huddle`, or `Away`.
  5. Colleagues view room-level and desk-level occupancies on an interactive 2D office grid.

### 3.2 Right Flow 2: Organic "Knock" and Instant Huddle
* **Principle**: Spontaneous collaboration should mimic tapping a colleague on the shoulder without calendar friction.
* **Flow**:
  1. User A navigates to User B's desk or shared pod and clicks "Knock".
  2. User B receives a polite, non-intrusive sound cue and banner with options: "Accept (Audio)", "Accept (Video)", "Join in 5 Mins", or "Decline with Status".
  3. Upon acceptance, an ephemeral WebRTC channel opens instantly in under 300ms.
  4. A shared scratchpad / whiteboard is provisioned automatically for the session.
  5. When participants leave the zone, media tracks sever cleanly and a brief summary/log prompt persists to the room archive.

### 3.3 Right Flow 3: Spatial Interest Management (Quadtree Filtering)
* **Principle**: Scale must not degrade network bandwidth or client rendering performance.
* **Flow**:
  1. The office map is divided into spatial regions using quadtree boundaries and room scopes.
  2. The server only broadcasts micro-coordinate and avatar movement updates to clients within the same visual viewport or room partition.
  3. Global users receive aggregated occupancy counts (e.g., "Engineering Floor: 42 active") rather than 10,000 individual movement events.
  4. Network payload scales as `O(k)` where `k` is local neighbors, instead of `O(N^2)`.

### 3.4 Right Flow 4: Async-First Work Artifact Generation
* **Principle**: Synchronous interactions must leave an asynchronous audit trail so time-zone shifted peers remain aligned.
* **Flow**:
  1. Every meeting room and desk cluster contains a persistent Markdown log and decision register.
  2. Action items tagged during a huddle automatically synchronize with project boards and notification feeds.
  3. Non-attendees can view the room timeline without requiring full meeting video replays.

### 3.5 Right Flow 5: Graceful Reconnection and Optimistic UI
* **Principle**: Mobile or transient network connections must never disrupt state consistency.
* **Flow**:
  1. Client maintains a local vector clock and offline action queue.
  2. If WebSocket disconnects, client switches to exponential backoff polling while rendering cached room topology.
  3. Reconnection triggers a differential state reconciliation handshake (`diff_sync`) rather than re-downloading entire office state.

---

## 4. Explicit Anti-Patterns and Anti-Flows

To prevent degradation into harmful or unscalable practices, the following anti-patterns are strictly prohibited:

### 4.1 Anti-Pattern 1: The Panopticon / Invasive Spyware Trap
* **Prohibited Behavior**: Keystroke counting, periodic background webcam capture, random screen grabs, window title tracking, or idle-time productivity scoring.
* **Why Banned**: Damages workplace trust, incentivizes mouse-jiggler deceit, causes psychological anxiety, and violates enterprise GDPR/privacy regulations.
* **Strict Substitute**: Output-oriented presence tracking (active desk assignment, calendar integration, explicit focus status toggles).

### 4.2 Anti-Pattern 2: The Synchronous Monopoly / Zoom Fatigue Trap
* **Prohibited Behavior**: Requiring all office participants to remain on perpetual video streams while working at their virtual desks.
* **Why Banned**: Severe cognitive drain, battery depletion, high bandwidth costs, and focus destruction.
* **Strict Substitute**: Audio-first or avatar-state presence with opt-in video only during active collaborative huddles.

### 4.3 Anti-Pattern 3: Monolithic WebSocket Broadcast Storms
* **Prohibited Behavior**: Emitting raw mouse coordinates or cursor movements across an entire organization of 1,000+ connected sockets.
* **Why Banned**: Saturates server CPU, saturates network egress, crashes browser UI threads, and destroys client frame rates.
* **Strict Substitute**: Viewport and room-scoped pub/sub channels with delta compression and position interpolation.

### 4.4 Anti-Pattern 4: Tightly Coupled Media and Application State
* **Prohibited Behavior**: Handling audio/video stream routing directly inside the primary NestJS web API process.
* **Why Banned**: High media transcoding and network I/O CPU spikes freeze HTTP request handling and WebSocket heartbeats.
* **Strict Substitute**: Decoupled SFU media servers (Mediasoup / LiveKit) communicating with the NestJS backend purely over signaling protocols.

### 4.5 Anti-Pattern 5: Ephemeral Black-Hole Decisions
* **Prohibited Behavior**: Spontaneous verbal huddles terminating without any structured capture, forcing absent or asynchronous team members to guess what decisions were made.
* **Why Banned**: Fragmented team knowledge and forced duplicate alignment meetings.
* **Strict Substitute**: Co-located room decision logs and instant summary exports.

---

## 5. Functional Requirements by Core Domain

### 5.1 Identity and Organization Hierarchy
* Multi-tenant structure: Organization -> Headquarters -> Floors -> Zones -> Rooms & Desks.
* Role-based access control (RBAC): `Owner`, `Admin`, `Floor Manager`, `Member`, `Guest`.
* Single Sign-On (SSO) via SAML/OAuth2 (Google, GitHub, OIDC) with fallback email magic-links.

### 5.2 Virtual Office Space and Floor Management
* Configurable floor layouts: Open Desks, Executive Boardrooms, Focused Quiet Pods, Watercooler Lounges.
* Real-time desk reservation: Hot-desking vs. Dedicated desks.
* Interactive 2D canvas view with accessibility navigation and keyboard shortcuts.

### 5.3 Real-Time Spatial Presence and Radar
* Live status badges: Available, Deep Work, In Meeting, On Break, Offline.
* Spatial radar displaying nearby colleagues and floor occupancy statistics.
* Do Not Disturb (DND) focus mode with custom timer countdowns.

### 5.4 Communication and Meeting Spaces
* Audio/Video rooms with screen-sharing capabilities.
* Peer-to-peer WebRTC signaling for small groups, scalable to SFU gateway for large townhalls.
* In-room ephemeral chat with file attachment support and Markdown rendering.

### 5.5 Desk and Room Workboards
* Persistent room boards for pinning daily goals, sprint roadmaps, and sticky notes.
* Real-time collaborative text editing per room.

---

## 6. Non-Functional Requirements

* **Performance**: Presence updates delivered in under 100ms round-trip; room layout initial load under 1.2s.
* **Availability**: 99.9% uptime with zero single points of failure in Tier 2 and Tier 3 topologies.
* **Security**: AES-256 encryption at rest; TLS 1.3 in transit; DTLS-SRTP for all media streams.
* **Aesthetics**: Universal Warm Editorial Light design system (`#fbfbfa` canvas, Plus Jakarta Sans headlines, Inter / DM Sans UI, solid obsidian actions, organic sage accents).
* **Observability**: Prometheus metrics endpoint, OpenTelemetry trace spans, and structured JSON logs.
