# Scale, Capacity & Infrastructure Topologies

REALNT HQ is engineered to scale seamlessly from small distributed teams to multinational corporate enterprises through modular containerization and spatial partitioning.

---

## 1. Scale Tiers & Hardware Sizing

| Deployment Tier | Concurrent Members | Recommended Compute | Database Topology | Media Architecture |
| :--- | :--- | :--- | :--- | :--- |
| **Tier A: Studio** | 1 to 25 | 2 vCPU, 4 GB RAM | Single PostgreSQL 16 + Redis 7 | P2P Mesh WebRTC |
| **Tier B: Growth** | 25 to 150 | 4 vCPU, 8 GB RAM | PostgreSQL 16 + Redis Sentinel | Decoupled SFU Gateway (LiveKit/Mediasoup) |
| **Tier C: Enterprise** | 150 to 1,000+ | 8-16 vCPU, 32 GB RAM | Managed Postgres + Read Replicas + Redis Cluster | Distributed SFU Relay Edge Network |

---

## 2. Spatial Quadtree Partitioning (Anti-Broadcast Storm)

To prevent `O(N^2)` bandwidth explosion when hundreds of avatars navigate the canvas, REALNT HQ enforces recursive 2D quadtree spatial partitioning:

```text
┌─────────────────────────┬─────────────────────────┐
│ Zone A1 (Desks 1-12)    │ Zone A2 (Desks 13-24)   │
│ Client receives full    │ Client receives 500ms   │
│ 100ms cursor ticks      │ aggregated presence     │
├─────────────────────────┼─────────────────────────┤
│ Zone B1 (Focus Pods)    │ Zone B2 (Huddle Rooms)  │
│ Presence updates only   │ Occupancy count only    │
│ on enter/leave          │ (Zero spatial ticks)    │
└─────────────────────────┴─────────────────────────┘
```

1. **Immediate Proximity Radius (Inner Ring, < 5 Tiles)**: Full-fidelity 100ms vector positions, typing indicators, and micro-animations.
2. **Intermediate Zone (Outer Ring, 5 to 20 Tiles)**: Downsampled 500ms throttled ticks.
3. **Distant Zones (> 20 Tiles)**: Aggregated occupancy counter only. Client threads receive zero cursor events.

---

## 3. Media Bandwidth Models (Audio & Video)

* **Meeting Rooms (< 6 Participants)**: WebRTC P2P mesh network; total server compute utilization is limited to lightweight WebSocket signaling.
* **Large Conferences (6 to 50 Participants)**: SFU routing where each client publishes 1 upstream stream and receives downsampled simulcast downstream streams.
* **Auditorium Broadcast (50 to 500+ Viewers)**: Low-latency HLS / WebRTC broadcast mode where stage speakers publish to the media cluster and spectators consume passive edge-cached streams.

---

## 4. Multi-Tenant Organization Isolation

REALNT HQ supports multi-tenant isolation within a single cluster:
* **Database Isolation**: Tenant discriminator column on core tables (`organizations`, `desks`, `rooms`, `artifacts`) with Row-Level Security (RLS) policies.
* **Socket Channel Fencing**: WebSocket channels are scoped to `org:{tenantId}:floor:{floorId}`, strictly preventing cross-tenant packet leakage.
* **Storage Partitioning**: Meeting recordings, decision registers, and whiteboard snapshots are partitioned by organization ID in S3-compatible object storage.
