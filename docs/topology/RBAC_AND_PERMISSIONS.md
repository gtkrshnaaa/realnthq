# Role-Based Access Control (RBAC) & Spatial Permissions

REALNT HQ enforces a 4-tier security matrix governing spatial movement, interactive protocols (knocks, video, audio), and administrative authority across the virtual headquarters.

---

## 1. Permission Tier Hierarchy

| Permission Tier | Representative Roles | Spatial Navigation Scope | Knock & Communication Rules | Admin & Broadcast Authority |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 0: Platform Operator** | Workspace Administrator, Lead DevOps | Unrestricted access to all floors (Levels 1-5), system telemetry, database status | Bypass knock queues for emergency broadcast | Global bulletin posting, user management, audit review |
| **Tier 1: Department Lead** | VP of Eng, Head of Product, VP Sales, HR Director | Levels 1-4 freely; Level 5 with executive privileges; access department war rooms | Priority soft knock; manage team desk assignments | Publish department-wide bulletins; view standup metrics |
| **Tier 2: Core Staff Member** | Engineers, Designers, SDRs, Support Specialists | Levels 1-4 freely; Level 5 on scheduled invite; access department desk clusters | Standard soft knock; subject to deep-work queue buffering | Post daily standup; view bulletin portal; export room notes |
| **Tier 3: External Visitor** | Clients, Auditors, Interview Candidates, Vendors | Strictly sandboxed to Level 1 Lobby and assigned meeting rooms | Direct chime to host user desk; zero floor browsing | View visitor greeting; participate in assigned WebRTC session |

---

## 2. Spatial Fencing & Door Access Policies

1. **Public Zones (Level 1)**:
   * Accessible by all verified organizational members and escorted visitors.
   * Proximity audio attenuation active by default.
2. **Departmental Enclosures (Levels 2, 3, 4)**:
   * Accessible by all Tier 0, 1, and 2 users.
   * Desks can be claimed dynamically ("Hot Desk") or assigned permanently ("Dedicated Desk").
3. **Restricted Confidential Chambers (Level 5)**:
   * Entry requires Tier 0, Tier 1, or an explicit calendar invite token.
   * Soft knocks are disabled; avatars outside cannot view the identity of attendees inside.

---

## 3. Presence Privacy & Knock Guardrails

* **Ghost Mode**: Executive leaders (Tier 0 and selected Tier 1) can activate Ghost Mode to observe workspace operational load without rendering an avatar or causing disruption.
* **Deep-Work Guard**: When a user activates a Pomodoro focus timer or occupies a Deep-Work Pod, incoming knocks from Tier 2 members are queued into their Desk Tray without ringing alerts. Tier 0 and Tier 1 leads can choose to bypass only under emergency flags.
* **Confidential 1-on-1 Isolation**: HR and Executive 1-on-1 rooms automatically drop audio streams to external eavesdroppers and log zero ephemeral transcripts.

---

## 4. Audit Logging & Compliance

All sensitive actions generate tamper-evident audit records:
* Room creation, deletion, and permission changes.
* Visitor pass issuance and room escort completions.
* Policy changes and administrative user role promotions.
