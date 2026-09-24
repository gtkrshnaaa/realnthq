'use client';

import React from 'react';
import { ShieldCheckIcon } from '@/components/icons/extended_icons';

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: 'DESK_CLAIM' | 'ROOM_JOIN' | 'GUEST_PASS_GENERATED' | 'FOCUS_ENGAGED' | 'STANDUP_POSTED';
  targetResource: string;
  status: 'SUCCESS' | 'DENIED';
}

interface AuditLogTableProps {
  events: AuditEvent[];
}

export function AuditLogTable({ events }: AuditLogTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/8 p-5 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-black/8 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-[#5a8357]" />
          <h3 className="text-sm font-bold text-[#252724]">Immutable Platform Audit Trail</h3>
        </div>
        <span className="text-[11px] font-mono text-[#252724]/60">
          Showing Last {events.length} Events
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-black/8 text-[11px] font-semibold text-[#252724]/60 uppercase tracking-wider">
              <th className="py-2.5 px-3">Timestamp</th>
              <th className="py-2.5 px-3">Actor</th>
              <th className="py-2.5 px-3">Action</th>
              <th className="py-2.5 px-3">Target Resource</th>
              <th className="py-2.5 px-3 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-black/2 transition-colors font-mono">
                <td className="py-2.5 px-3 text-[#252724]/60 text-[11px] whitespace-nowrap">
                  {ev.timestamp}
                </td>
                <td className="py-2.5 px-3 font-semibold text-[#252724] font-sans">
                  {ev.actorEmail}
                </td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded-md bg-black/5 text-[#252724] text-[10px] font-mono">
                    {ev.action}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-[#252724]/75 font-sans">
                  {ev.targetResource}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ev.status === 'SUCCESS'
                        ? 'bg-[#eef2ec] text-[#5a8357]'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
