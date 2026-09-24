# REALNT HQ: Digital Workplace Facilities Specification

## 1. Overview: The Digital Equivalent of Physical Infrastructure

In a traditional brick-and-mortar office, productivity and company culture depend on physical facilities: private desks, quiet focus pods, whiteboard rooms, coffee lounges, all-hands auditoriums, and visitor reception areas.

REALNT HQ translates each physical workplace facility into a **production-grade digital facility** embedded natively into the web platform. 

This document defines the functional behavior, interaction rules, and engineering requirements for all 10 core workplace facilities.

---

## 2. Workplace Facilities Catalog

```
+------------------------------------------------------------------------------------------+
|                            REALNT HQ WORKPLACE FACILITIES MATRIX                         |
+------------------------------------------------------------------------------------------+
| 1. Personal & Hot Desks       | 2. Deep-Work Focus Pods       | 3. Ad-Hoc Knocking Tunnel|
| - Seat claim & release        | - Pomodoro focus countdown    | - Sub-second peer audio  |
| - Custom sticky note board    | - Proximity audio isolation   | - Polite knock prompt    |
| - Occupant presence badge     | - Distraction knock buffering | - Accept / Defer / Busy  |
+-------------------------------+-------------------------------+--------------------------+
| 4. Synchronous War Rooms      | 5. Collaborative Whiteboards  | 6. Watercooler Lounge    |
| - Multi-party WebRTC video    | - Real-time vector sketchpad  | - Spatial distance audio |
| - Incident SEV-1 tagging      | - Sticky notes & architecture | - Casual drop-in chats   |
| - Multi-stream screen share   | - 1-Click ADR export          | - Zero calendar scheduling|
+-------------------------------+-------------------------------+--------------------------+
| 7. All-Hands Stage & PA       | 8. Digital Mailroom (Tray)    | 9. Visitor Reception     |
| - Keynote broadcast stream    | - Buffered knock inbox        | - 6-Digit guest pass codes|
| - Hand-raise audience queue   | - Offline mentions & notes    | - Sandboxed guest lobby  |
| - Priority ticker bulletin    | - Post-flow review dialog     | - 1-Click host escort    |
+-------------------------------+-------------------------------+--------------------------+
| 10. Async Standup Kiosk       |                                                          |
| - Yesterday/Today/Blocker     |                                                          |
| - Squad blocker triage board  |                                                          |
+-------------------------------+----------------------------------------------------------+
```

---

## 3. Detailed Facility Specifications

### 3.1 Facility 1: Personal Assigned Desks & Shared Hot Desks

* **Physical Equivalent:** Ergonomic desk with monitor and nameplate vs floating hot-desk bench.
* **Digital Implementation:**
  * **Dedicated Desk (`DEDICATED`):** Permanently reserved for an employee. Renders avatar, job title, and presence dot. Displays custom sticky note left by the occupant.
  * **Hot Desk (`HOT_DESK`):** Unassigned floating seat available to any authenticated user on first-come-first-served basis. Automatically releases occupancy after 30 minutes of socket disconnection.
  * **Desk Sticky Notes:** Occupants can type an ambient note (max 140 chars, e.g., "In customer interview until 3 PM. Ping Slack for P0 bugs.") that appears in a tooltip when colleagues hover over the desk.

---

### 3.2 Facility 2: Deep-Work Isolation Pods

* **Physical Equivalent:** Acoustic soundproof privacy booth (Phone booth / Focus pod).
* **Digital Implementation:**
  * **Flow Timer:** Integrated Pomodoro countdown timer (15, 25, 50, 90 minutes).
  * **Acoustic Isolation:** Automatically disconnects user from floor proximity audio so nearby conversations cannot interrupt.
  * **Distraction Shield:** Sets presence status to `DEEP_WORK`. Automatically silences incoming knocks and routes them to the user's Desk Tray.
  * **Session Exit Summary:** Upon timer expiration, status transitions back to `AVAILABLE` and prompts the user with their queued Desk Tray messages.

---

### 3.3 Facility 3: Ad-hoc Knocking Tunnel

* **Physical Equivalent:** Tapping a colleague on the shoulder to ask a quick 2-minute question.
* **Digital Implementation:**
  * **Instant Initiation:** Click colleague's desk or avatar to send a polite knock with an optional message (e.g. "Quick question on PR #402?").
  * **Recipient Options:**
    * **Accept:** Instantly opens a 1-on-1 WebRTC audio tunnel in under 1 second without generating calendar links or meeting rooms.
    * **Decline with Quick Reason:** Pre-set responses ("In flow", "Stepping away", "Chat on Slack").
    * **Buffer to Tray:** Automatically queued if recipient is in focus mode.

---

### 3.4 Facility 4: Synchronous Collaboration Suites & Incident War Rooms

* **Physical Equivalent:** Conference room with dual TVs, speakerphone, and incident war room setup.
* **Digital Implementation:**
  * **Dynamic Room Typology:**
    * `HUDDLE`: Low-latency 2-8 person squad sync.
    * `CONFERENCE`: Formal meeting room with agenda, screen share, and minutes recording.
    * `WAR_ROOM`: P0/P1 incident command room with severity tag, runbook links, and automated SRE telemetry webhooks.
  * **Dual Screen Sharing:** Allows two developers or designer/engineer pairs to share screens side-by-side simultaneously.

---

### 3.5 Facility 5: Collaborative Whiteboard & Architecture Canvas

* **Physical Equivalent:** Floor-to-ceiling glass whiteboard with dry-erase markers and sticky notes.
* **Digital Implementation:**
  * **Multi-User Vector Canvas:** Low-latency collaborative drawing using SVG paths, shapes, connector lines, and text.
  * **Sticky Note Clusters:** Brainstorming cards color-coded by category (Problem, Solution, Risk, Next Step).
  * **1-Click ADR Export:** Exports current diagram and text notes directly into structured Markdown format in the `/artifacts` Decision Logs.

---

### 3.6 Facility 6: Casual Watercooler Lounge & Coffee Bar

* **Physical Equivalent:** Office pantry, coffee machine, or cafe booth.
* **Digital Implementation:**
  * **Spatial Audio Proximity:** Audio volume drops off smoothly using an inverse square falloff equation based on distance between avatars.
  * **Zero Calendar Scheduling:** A persistent room where anyone can hang out during breaks; conversations start naturally when avatars walk near each other.
  * **Ambient Audio Track:** Optional soothing background soundscapes (gentle coffee shop, light rain, low-fi focus).

---

### 3.7 Facility 7: All-Hands Stage & Public Address (PA) System

* **Physical Equivalent:** Large auditorium with stage, podium, microphones, and projector screen.
* **Digital Implementation:**
  * **Keynote Stage Mode:** Stage speakers broadcast video/audio to unlimited attendees with minimal latency.
  * **Audience Moderation:** Audience audio/video muted by default. Attendees click "Raise Hand" to enter an approval queue.
  * **Priority PA Announcements:** Capability for leadership to broadcast a banner notification across all active user sessions simultaneously.

---

### 3.8 Facility 8: Digital Mailroom & Desk Tray

* **Physical Equivalent:** In-tray on an employee's desk holding memos, letters, and delivery packages.
* **Digital Implementation:**
  * **Asynchronous Knock Queue:** Holds all knocks and pings received while the user was in `DEEP_WORK` or `OFFLINE`.
  * **1-Click Connect:** Reviewing the tray provides 1-click buttons to call back or reply to colleagues who knocked.
  * **Desk Sticky Notes Archive:** Past sticky notes are saved for reuse across working days.

---

### 3.9 Facility 9: Visitor Reception & Guest Pass Escort

* **Physical Equivalent:** Front desk reception lobby with security guard, visitor logbook, and guest badges.
* **Digital Implementation:**
  * **Temporary 6-Digit Pass:** Internal employee generates a time-bound pass code (e.g., `REALNT-8291`).
  * **Sandboxed Guest Lobby:** Visitor opens magic link, inputs code, and enters an isolated lobby with waiting music and host status.
  * **Host Escort Action:** Host receives arrival alert and clicks "Escort Guest", seamlessly transporting both host and visitor directly into the designated demo or interview room.

---

### 3.10 Facility 10: Asynchronous Standup Kiosk

* **Physical Equivalent:** Standup whiteboard where squad members post morning task index cards.
* **Digital Implementation:**
  * **3-Prompt Daily Briefing:** Simple submission form: Accomplished Yesterday, Planned Today, Active Blockers.
  * **Squad Timeline:** Chronological feed grouped by department or squad.
  * **Blocker Escalation:** Any blocker automatically highlights the author's card in amber, alerting managers and teammates to assist.
