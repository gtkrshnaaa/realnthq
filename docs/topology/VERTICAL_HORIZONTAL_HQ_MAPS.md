# Vertical & Horizontal HQ Campus Maps

REALNT HQ organizes enterprise headquarters into a continuous two-dimensional matrix: vertical elevation (7 floor levels) and horizontal zoning (4 cardinal wings per floor).

---

## 1. Vertical Elevation Cross-Section

```text
┌────────────────────────────────────────────────────────────────────────┐
│ LEVEL 6: Penthouse Boardroom, Investor Observatory & Founders Sanctum  │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 5: People Operations, Talent Acquisition & Confidential HR Pods  │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 4: Go-To-Market Hub, Sales Pitch Arena & Customer Demo Studios   │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 3: Product Strategy, UI/UX Design Studios & Research Usability   │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 2: Engineering & Infrastructure, Deep-Work Pods, War Rooms       │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 1: Ground Commons, Global Reception Lobby & Town Hall Amphitheater│
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL B1: Subterranean Data Center, CI/CD Telemetry & Security Vault   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Horizontal Quadrant Blueprint (Per Floor)

Every floor plan is partitioned into four horizontal wings surrounding a central circulation core:

```text
               [ NORTH: Panoramic Exterior Windows ]
       ┌───────────────────────┬───────────────────────┐
       │   WEST WING (FOCUS)   │   EAST WING (COLLAB)  │
       │   * Silent Hot Desks  │   * Huddle War Rooms  │
       │   * Deep-Work Pods    │   * Whiteboard Studio │
       │   * Pair Workstations │   * Sprint Rooms      │
       ├───────────────────────┴───────────────────────┤
       │             CENTRAL CIRCULATION ATRIUM        │
       │   * Elevator Core & Express Stairwell         │
       │   * Standup Kiosk & Bulletin Wall             │
       │   * Campus Wayfinding Terminal                │
       ├───────────────────────────────────────────────┤
       │             SOUTH WING (COMMONS)              │
       │   * Watercooler Lounge & Casual Cafe          │
       │   * Proximity Audio Attenuation Zone          │
       │   * Pantry Booths & Restorative Nooks         │
       └───────────────────────────────────────────────┘
```

---

## 3. Spatial Coordinate Grid & Addressing Standard

To eliminate ambiguity across large multi-thousand avatar campuses, every desk, room, and kiosk is addressed using a standardized URI token:

`REALNT://{floor_code}/{wing_code}/{zone_type}/{index}`

* **Floor Codes**: `B1`, `L1`, `L2`, `L3`, `L4`, `L5`, `L6`.
* **Wing Codes**: `W` (West), `CTR` (Central), `E` (East), `S` (South).
* **Zone Types**: `POD` (Deep-Work Pod), `DESK` (Workstation), `RM` (Meeting Room), `LNG` (Lounge), `KSK` (Standup Kiosk).
* **Examples**:
  * `REALNT://L2/W/POD/01`: Level 2, West Wing, Deep-Work Pod 01.
  * `REALNT://L1/CTR/KSK/01`: Level 1, Central Atrium, Standup Kiosk.
  * `REALNT://L4/E/RM/DEMO-A`: Level 4, East Wing, Customer Demo Suite A.

---

## 4. Acoustic Zoning & Audio Attenuation Matrix

| Zone Category | Target Wing | Proximity Audio Radius | Ambient Knock Behavior | Privacy Policy |
| :--- | :--- | :--- | :--- | :--- |
| **Silent Focus** | West Wing | 0 tiles (Muted) | Automatically buffered to Desk Tray | Door reflects busy countdown |
| **Standard Work** | Central / West | 1 tile (Low Gain) | Standard soft chime with opt-in dialog | Avatar visible |
| **Collaboration** | East Wing | Room-Scoped only | Meeting invite required | Ephemeral scratchpad saved |
| **Social Commons** | South Wing | 3 tiles (-6 dB dropoff) | Free ambient conversation | Proximity walk-by audio active |
| **Confidential** | Level 5 & L6 | Isolated WebRTC | Disabled by default; invite token only | Zero server transcripts |

---

## 5. Vertical Transit & Circulation Core

* **Smart Elevator Shafts**: Central Atrium features high-speed floor dispatchers. Avatars step into the elevator portal to select any floor level with instantaneous position reconciliation.
* **Express Fire Stairwells**: Lightweight zero-bandwidth transit between adjacent floors (e.g. L2 to L3) without triggering global state invalidation.
* **Visitor Escort Gates**: L1 Lobby turnstiles verify `REALNT-GUEST-XXXX` tokens before enabling elevator passage to authorized meeting rooms.
