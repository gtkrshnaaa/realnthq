# REALNT HQ: Role-Based Access Control (RBAC) & Security Matrix

## 1. Overview & Security Model

In an enterprise virtual workplace, security and access boundaries must balance openness and spontaneous collaboration with confidentiality and least-privilege compliance.

This document details the authorization matrix mapping the 7 user tiers and job roles against all web routes, workplace facilities, and privileged platform actions.

---

## 2. Granular Permissions & Capabilities Matrix

| Platform Capability | System Admin | Executive | Squad Lead | Member / IC | Sales / GTM | People Ops | Contractor | Guest |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Claim Dedicated Desk** | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| **Claim Flexible Hot Desk**| Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| **Initiate Ad-Hoc Knock** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| **Join Public Meeting Rooms** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Invited Only |
| **Join Executive Boardrooms** | Yes | Yes | Invited Only | No | No | Invited Only | No | No |
| **Trigger Incident War Room (SEV-1)** | Yes | Yes | Yes | Yes (On-call) | No | No | No | No |
| **Take Broadcast Stage** | Yes | Yes | Invited Only | Audience | Audience | Stage Host | Audience | No |
| **Publish Bulletin Announcement** | Yes | Yes | Squad Only | No | No | Yes | No | No |
| **Generate Guest Passes** | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| **Escort Guest into Room**| Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| **Export Whiteboard to ADR** | Yes | Yes | Yes | Yes | Yes | Yes | Read Only | No |
| **View Telemetry & Health**| Yes | Yes | Yes | Read Only | No | No | No | No |
| **View Audit Logs** | Yes | Yes | No | No | No | No | No | No |
| **User Provisioning & Roles**| Yes | No | No | No | No | Read Only | No | No |

---

## 3. Route Access Authorization Table

```
Route Path           Access Rules & Security Restrictions
---------------------------------------------------------------------------------------------
/                    Public to all authenticated users & visitors.
/office              Full spatial canvas accessible to Admins, Members, and Contractors.
                     Guests restricted unless accompanied by internal host avatar.
/rooms               Public rooms accessible to all members.
                     Locked boardrooms require role flag `is_executive=true` or room token.
/broadcasts          Public viewing to all employees.
                     Microphone and screen broadcast restricted to stage speaker queue.
/standup             Public view to all internal staff.
                     Posting restricted to authenticated employees and active contractors.
/team                Accessible to all internal staff.
                     Contractors view team squad only; Guests cannot view directory.
/artifacts           Public read for internal staff.
                     Write permissions restricted to verified contributors.
/telemetry           Restricted to roles: System Admin, Executive, SRE, Engineering Lead.
/admin               Strictly restricted to System Administrators and Workplace Operations.
/lobby               Public landing portal for visitors holding temporary 6-digit access codes.
```

---

## 4. Enforcement Architecture

1. **Next.js Middleware Gatekeeping:** Client route navigation checks session JWT claims against required permission scopes before hydration.
2. **WebSocket Gateway Authorization:** Socket events (e.g. `broadcast:stage:join`, `room:lock`) are verified against the user's database role record prior to broadcasting payloads.
3. **Immutable Security Audit Log:** All privileged actions (e.g., floor editing, role promotion, guest token generation) write an immutable record into the audit log.
