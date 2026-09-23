# Explicit Flow Matrix: Right Patterns vs Anti-Patterns

## Project: realntoffice
**Document Version:** 1.0.0  
**Scope:** Engineering, Product, and Architectural Standards

---

## 1. Architectural Philosophy

Every feature in `realntoffice` must adhere to an explicit pattern boundary. This document contrasts the **Right Flow** (the mandatory design implementation) against the **Anti-Pattern** (the prohibited shortcut or harmful anti-flow).

---

## 2. Comprehensive Flow Comparison Table

| Domain | Right Flow (Mandatory Standard) | Anti-Pattern (Strictly Prohibited) | Architectural / Psychological Reason |
| :--- | :--- | :--- | :--- |
| **User Presence** | Ambient status tags (`Focusing`, `Available`, `In Meeting`) attached to desk or room slots. Debounced heartbeats (30s). | Keystroke loggers, periodic webcam snapshots, mouse movement heatmaps. | Preserves psychological safety, eliminates spyware anxiety, conforms to enterprise GDPR. |
| **Ad-Hoc Huddle** | Soft "Knock" protocol with discrete audio chime and opt-in acceptance modal. | Auto-unmuting forced drop-ins or calendar invite spam for 2-minute questions. | Protects flow state while enabling natural, low-friction interactions. |
| **Real-Time Data Distribution** | Spatial quadtree partitioning; room-scoped pub/sub channels; aggregated occupancy for distant zones. | Unpartitioned global broadcast of cursor coordinates to every client in the enterprise. | Prevents `O(N^2)` bandwidth explosion, server socket saturation, and browser thread blocking. |
| **Media Architecture** | Decoupled SFU media servers (Mediasoup / LiveKit) controlled by lightweight signaling. | Ingesting and transcoding WebRTC RTP packets directly in the primary NestJS process. | Prevents CPU spikes from stalling HTTP/WebSocket business state pipelines. |
| **Meeting Documentation** | Room-level persistent markdown journals and decision registers synced asynchronously. | Purely verbal ephemeral meetings where absent or time-zone-shifted members lose context. | Solves knowledge fragmentation and prevents duplicate alignment sessions. |
| **Offline & Reconnection** | Vector clock state tracking with exponential backoff and delta reconciliation. | Blind hard-refresh or total state re-download on transient network disconnections. | Conserves bandwidth and prevents visual flickering on unstable networks. |
| **UI Aesthetics** | Warm Editorial Light system: `#fbfbfa` canvas, Fraunces serif, DM Sans UI, solid obsidian actions, soft sage accents. | Neon purple gradients on pitch black, unstyled browser checkboxes, floating centered bubbles. | Delivers a serene, professional environment suitable for 8-hour daily enterprise use. |

---

## 3. Concrete Code and Behavioral Comparisons

### 3.1 Presence Broadcasting

#### Anti-Pattern (Forbidden)
```typescript
// ANTI-PATTERN: Emitting continuous raw mouse movements globally to all users
@SubscribeMessage('mouse_move')
handleMouseMove(client: Socket, data: { x: number; y: number }) {
  this.server.emit('global_user_moved', { userId: client.id, ...data });
}
```

#### Right Flow (Mandatory)
```typescript
// RIGHT FLOW: Scoped room/zone presence updates with debounced state transitions
@SubscribeMessage('presence:update_status')
async handleStatusChange(
  @ConnectedSocket() client: Socket,
  @MessageBody() dto: UpdatePresenceStatusDto,
) {
  const user = await this.authService.validateSocket(client);
  const updatedState = await this.presenceService.updateStatus(user.id, dto);
  
  // Broadcast exclusively to members in the same campus/floor partition
  this.server.to(`floor:${user.floorId}`).emit('presence:member_updated', {
    userId: user.id,
    deskId: updatedState.deskId,
    status: updatedState.status,
    zoneId: updatedState.zoneId,
    timestamp: Date.now(),
  });
}
```

---

### 3.2 Spontaneous Interaction

#### Anti-Pattern (Forbidden)
* Forcing an automatic audio bridge without recipient consent when User A approaches User B's avatar.
* Blasting continuous alert sirens that interrupt ongoing focus sessions.

#### Right Flow (Mandatory)
* User A sends a structured knock request (`knock:send`).
* The system checks User B's current status:
  * If User B is marked as `Deep Work / DND`, the knock is silently queued into a polite digest with zero sound interruption.
  * If User B is `Available`, a single gentle chime plays, rendering a non-blocking toast with 4 one-click actions: "Accept Now", "Audio Only", "In 5 Mins", or "Decline".

---

### 3.3 Media Ingestion Separation

#### Anti-Pattern (Forbidden)
* Attempting to route WebRTC media streams directly inside the NestJS main thread alongside database queries.

#### Right Flow (Mandatory)
* NestJS handles purely signaling, room authentication, and JWT authorization tokens.
* Clients receive an ephemeral signaling token to connect directly to the dedicated SFU node pool or WebRTC peer mesh.
