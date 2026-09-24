'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { TelemetryMetrics } from '@/components/telemetry/telemetry_metrics';
import { AuditLogTable, AuditEvent } from '@/components/telemetry/audit_log_table';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

export default function TelemetryPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@squad.realnthq.local',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
    statusMessage: 'Auditing platform telemetry metrics',
  });

  const [auditEvents] = useState<AuditEvent[]>([
    {
      id: 'aud-1',
      timestamp: '2026-09-24 10:14:02 UTC',
      actorEmail: 'admin@squad.realnthq.local',
      action: 'DESK_CLAIM',
      targetResource: 'desk:desk-1 (Floor 2 Engineering)',
      status: 'SUCCESS',
    },
    {
      id: 'aud-2',
      timestamp: '2026-09-24 10:12:15 UTC',
      actorEmail: 'sarah@squad.realnthq.local',
      action: 'FOCUS_ENGAGED',
      targetResource: 'focus_pod:pod-4 (50m Pomodoro)',
      status: 'SUCCESS',
    },
    {
      id: 'aud-3',
      timestamp: '2026-09-24 10:08:44 UTC',
      actorEmail: 'kenji@squad.realnthq.local',
      action: 'ROOM_JOIN',
      targetResource: 'room:turing-war-room (Huddle)',
      status: 'SUCCESS',
    },
    {
      id: 'aud-4',
      timestamp: '2026-09-24 09:55:10 UTC',
      actorEmail: 'alex@squad.realnthq.local',
      action: 'GUEST_PASS_GENERATED',
      targetResource: 'pass:REALNT-9482 (Host: Alex Vance)',
      status: 'SUCCESS',
    },
  ]);

  const handleUpdateStatus = (status: UserPresenceStatus, message?: string) => {
    setCurrentUser((prev) => ({ ...prev, status, statusMessage: message }));
  };

  const metrics = [
    {
      label: 'Socket Ping Latency',
      value: '14 ms',
      subValue: 'Jitter: +/- 1.2 ms',
      status: 'OPTIMAL' as const,
    },
    {
      label: 'Connected Sockets',
      value: '38 Active',
      subValue: 'Interest Nodes: 12',
      status: 'OPTIMAL' as const,
    },
    {
      label: 'WebRTC SFU Bitrate',
      value: '28.4 Mbps',
      subValue: 'Packet Loss: 0.01%',
      status: 'OPTIMAL' as const,
    },
    {
      label: 'Database Pool (PG)',
      value: '6 / 20 Conn',
      subValue: 'Query p99: 4.8 ms',
      status: 'NORMAL' as const,
    },
  ];

  return (
    <DashboardLayout
      activePath="/telemetry"
      title="Platform Telemetry & Operations"
      subtitle="Real-time WebSockets latency, WebRTC SFU bandwidth, and security audit log"
      badge="Cluster Healthy"
      currentUser={currentUser}
      onUpdateStatus={handleUpdateStatus}
    >
      <div className="space-y-6">
        <TelemetryMetrics metrics={metrics} />
        <AuditLogTable events={auditEvents} />
      </div>
    </DashboardLayout>
  );
}
