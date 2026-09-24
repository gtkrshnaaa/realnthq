# REALNT HQ: Organizational Roles & Job Titles Specification

## 1. Overview & Organizational Model

To function as a true virtual headquarters for modern distributed enterprises, REALNT HQ accommodates 7 core departmental organs and 30+ distinct functional roles. 

Developers building features, access rules, notifications, or UI components must consult this specification to ensure each role's distinct workflow is fully supported.

---

## 2. Departmental Breakdown & Job Title Taxonomy

### 2.1 Executive Leadership & Governance

| Job Title | Department Code | Primary Workspaces | Visibility Profile |
| :--- | :--- | :--- | :--- |
| **Chief Executive Officer (CEO)** | `EXECUTIVE` | Boardroom, All-Hands Stage, Focus Pod | Configurable: Public, Ghost Mode, or Focus |
| **Chief Technology Officer (CTO)** | `EXECUTIVE` | Architecture War Room, Tech Radar, Boardroom | Public during huddles, Focus during reviews |
| **Chief Product Officer (CPO)** | `EXECUTIVE` | Product Critique Room, Roadmap Board, Boardroom | Public / Open Collaboration |
| **Chief Operating Officer (COO)** | `EXECUTIVE` | Telemetry Dashboard, Operations Suite | Open Co-presence |
| **General Counsel / Legal Lead** | `EXECUTIVE` | Confidential 1-on-1 Booths, Vault Archives | Private / Confidential Only |

#### Operational Needs:
* **Company-Wide Broadcast Stage:** Capability to take the stage in `/broadcasts`, publish pinned announcements, and host live AMAs.
* **Encrypted Executive Sessions:** Access to lockable executive boardrooms where screen sharing, transcripts, and attendees are strictly access-controlled.
* **Ambient Observer ("Ghost Mode"):** Optional capability to inspect floor occupancy and squad distribution without broadcasting audio or video markers.

---

### 2.2 Engineering, Infrastructure & SRE

| Job Title | Department Code | Primary Workspaces | Daily Workflow Profile |
| :--- | :--- | :--- | :--- |
| **Engineering Manager (EM)** | `ENGINEERING` | Standup Kiosk, Huddle Rooms, 1-on-1 Booths | 50% meetings, 50% sprint tracking |
| **Tech Lead / Architect** | `ENGINEERING` | Whiteboard Rooms, War Rooms, Focus Desks | Architecture design, technical RFC reviews |
| **Staff Distributed Systems Engineer** | `ENGINEERING` | Dedicated Desk, Deep-Work Focus Pod | Extended deep work (2-4 hr focus blocks) |
| **Senior Backend Engineer** | `ENGINEERING` | Dedicated Desk, Sprint Cluster, Huddles | API implementation, PR review pairing |
| **Senior Frontend Engineer** | `ENGINEERING` | Dedicated Desk, Design Sync Suite | Component engineering, visual verification |
| **Site Reliability Engineer (SRE)** | `ENGINEERING` | Production Incident War Room, Telemetry Console | Real-time monitoring, incident war room command |
| **QA Automation Engineer** | `ENGINEERING` | Regression Lab, Focus Desks | Test matrix review, bug reproduction sync |

#### Operational Needs:
* **Deep-Work Isolation:** Integrated Pomodoro timers that buffer knocks into the Desk Tray so flow state is never interrupted.
* **Zero-Calendar Ad-Hoc Pairing:** Ability to knock a teammate's desk and start an instant peer audio channel in under 1 second.
* **Incident War Room:** 1-click conversion of any collaboration room into an active incident war room with severity badges and telemetry feeds.

---

### 2.3 Product Strategy, Design & Research

| Job Title | Department Code | Primary Workspaces | Daily Workflow Profile |
| :--- | :--- | :--- | :--- |
| **Director of Product** | `PRODUCT` | Standup Kiosk, Strategy Hub, All-Hands | Cross-functional alignment, quarterly roadmap |
| **Technical Product Manager (TPM)**| `PRODUCT` | Sprint War Room, Decision Logs (ADRs) | Spec authoring, blocker removal, delivery sync |
| **Staff Product Designer** | `DESIGN` | Design Critique Studio, Whiteboards | Figma screen share, design system reviews |
| **UX Researcher** | `DESIGN` | Usability Observation Lab, Interview Booth | External user testing, interview recordings |
| **Design Systems Lead** | `DESIGN` | Design Studio, Component Scratchpad | Token governance, design-to-code alignment |

#### Operational Needs:
* **High-Fidelity Screen Sharing:** Priority bandwidth allocation for 60 FPS vector canvas presentations.
* **Persistent Whiteboards:** Collaborative canvases linked to meeting notes that persist across sessions.
* **Usability Testing Sandbox:** Capability to host external research subjects in observation rooms without exposing internal channels.

---

### 2.4 Revenue, Sales & Solutions Engineering

| Job Title | Department Code | Primary Workspaces | Daily Workflow Profile |
| :--- | :--- | :--- | :--- |
| **VP of Sales** | `REVENUE` | Deal War Room, Executive Boardroom | Pipeline reviews, high-stakes enterprise close |
| **Enterprise Account Executive (AE)**| `REVENUE` | Client Demo Suite, External Meeting Rooms | Prospective customer walkthroughs, contract syncs |
| **Sales Development Rep (SDR)** | `REVENUE` | Outbound Calling Booth, Team Bullpen | High-volume client outreach, pitch coaching |
| **Solutions Architect (SA)** | `REVENUE` | Technical Demo Suite, Architecture Hub | Technical proof-of-concept demonstrations |
| **Customer Success Manager (CSM)** | `REVENUE` | Client Onboarding Room, Support Hub | Quarterly business reviews, client retention |

#### Operational Needs:
* **Guest Onboarding & Demo Suites:** Generation of 6-digit visitor passes or magic links for enterprise prospects.
* **Branded Client Lounges:** Virtual waiting rooms featuring company logos, agenda slides, and host greeting notifications.
* **Pitch Coaching & Sidecar Whispering:** Ability for sales leads to observe junior SDR pitches without client audio disruption.

---

### 2.5 Marketing, Brand & Communications

| Job Title | Department Code | Primary Workspaces | Daily Workflow Profile |
| :--- | :--- | :--- | :--- |
| **Head of Marketing** | `MARKETING` | All-Hands Stage, Campaign Strategy Suite | Brand positioning, launch orchestration |
| **Developer Advocate / DevRel Lead**| `MARKETING` | Public Broadcast Studio, Community Lounge | Community workshops, external tech talks |
| **Content & Communications Strategist**| `MARKETING` | Bulletin Editorial Desk, Focus Pod | Company announcements, release blog drafts |
| **Event Producer** | `MARKETING` | Amphitheater Control Booth, Townhall Stage | Stage audio balancing, attendee moderation |

#### Operational Needs:
* **Broadcast Publishing:** Editorial permissions to draft, schedule, and pin org-wide announcements to the Company Bulletin Portal.
* **Stage Management:** Controls to mute non-speakers, spotlight keynote panelists, and moderate Q&A questions during townhalls.

---

### 2.6 People Operations, Talent & Workplace Culture

| Job Title | Department Code | Primary Workspaces | Daily Workflow Profile |
| :--- | :--- | :--- | :--- |
| **VP of People** | `PEOPLE_OPS` | Confidential 1-on-1 Suite, Executive Boardroom | Culture strategy, leadership coaching |
| **Talent Acquisition Partner (Recruiter)**| `PEOPLE_OPS` | Candidate Interview Lounge, Lobby Desk | Candidate greeting, interview panel routing |
| **HR Business Partner (HRBP)** | `PEOPLE_OPS` | Private 1-on-1 Booths, Team Floors | Employee relations, performance coaching |
| **Workplace Operations Manager** | `PEOPLE_OPS` | Admin Console, Virtual Office Floor Plan Editor| Floor layout customization, desk assignments |

#### Operational Needs:
* **Candidate Escort System:** Automatic alerts when an interview candidate enters `/lobby`, allowing recruiters to greet and teleport them to the interview room.
* **Confidentiality Fencing:** Strict audio privacy guaranteeing that conversations in HR suites cannot leak into surrounding proximity audio.
* **Desk Allocation Console:** Tools to assign permanent desks, mark hot desks, and configure team floor boundaries.

---

### 2.7 External Collaborators & Guests

| Persona | Access Level | Primary Workspaces | Constraints & Boundaries |
| :--- | :--- | :--- | :--- |
| **Contractor / Freelancer** | `CONTRACTOR` | Assigned Sprint Floor, Designated Rooms | Restricted from executive boardrooms and HR suites |
| **Enterprise Client** | `GUEST` | Client Demo Suite, Reception Lobby | Sandboxed to sponsored room; expires after meeting |
| **Job Candidate** | `GUEST` | Reception Lobby, Interview Room | Cannot view employee directory or floor canvas |
| **Compliance Auditor** | `AUDITOR` | Decision Vault, Audit Log Console | Read-only access to decision records and logs |

#### Operational Needs:
* **Time-Bound Ephemeral Passes:** Guest tokens that automatically revoke access after meeting conclusion.
* **Zero Lateral Movement:** Sandboxed network boundaries preventing external visitors from wandering into internal employee desks.
