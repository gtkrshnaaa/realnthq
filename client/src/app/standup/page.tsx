'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { StandupCard } from '@/components/standup/standup_card';
import { StandupEntry, UserProfile, UserPresenceStatus } from '@/types/office.types';
import { ClipboardCheckIcon } from '@/components/icons/extended_icons';

export default function StandupPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@squad.realnthq.local',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
    statusMessage: 'Logging daily check-in',
  });

  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');
  const [selectedSquad, setSelectedSquad] = useState('ALL');

  const [entries, setEntries] = useState<StandupEntry[]>([
    {
      id: 'se-1',
      userId: 'b0000000-0000-0000-0000-000000000002',
      userName: 'Sarah Connor',
      displayTitle: 'Staff Product Designer',
      yesterday: 'Exported high-contrast Obsidian Amber palette and audited form control chevrons.',
      today: 'Synchronizing Figma master tokens with Tailwind config and reviewing room whiteboard UI.',
      timestamp: '9:15 AM',
    },
    {
      id: 'se-2',
      userId: 'b0000000-0000-0000-0000-000000000003',
      userName: 'Kenji Sato',
      displayTitle: 'Distributed Systems Lead',
      yesterday: 'Implemented spatial quadtree interest management in NestJS WebSocket gateway.',
      today: 'Benchmarking WebRTC SFU peer connection bitrate during 50+ concurrent avatar movements.',
      blockers: 'Need verification on PostgreSQL connection pooling limit in Docker staging.',
      timestamp: '9:30 AM',
    },
    {
      id: 'se-3',
      userId: 'b0000000-0000-0000-0000-000000000004',
      userName: 'Elena Rostova',
      displayTitle: 'Product Operations Lead',
      yesterday: 'Reviewed customer interview synthesis and drafted Q3 roadmap themes.',
      today: 'Hosting usability testing sessions in Reception Lobby and coordinating client demo suites.',
      timestamp: '10:00 AM',
    },
  ]);

  const handleUpdateStatus = (status: UserPresenceStatus, message?: string) => {
    setCurrentUser((prev) => ({ ...prev, status, statusMessage: message }));
  };

  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yesterday.trim() || !today.trim()) return;
    const newEntry: StandupEntry = {
      id: `se-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      displayTitle: currentUser.displayTitle,
      yesterday: yesterday.trim(),
      today: today.trim(),
      blockers: blockers.trim() || undefined,
      timestamp: 'Just now',
    };
    setEntries((prev) => [newEntry, ...prev]);
    setYesterday('');
    setToday('');
    setBlockers('');
  };

  const activeBlockersCount = entries.filter((e) => Boolean(e.blockers)).length;

  return (
    <DashboardLayout
      activePath="/standup"
      title="Daily Standup Kiosk"
      subtitle="Asynchronous daily team pulse, progress updates, and blocker resolution"
      badge="Daily Pulse"
      currentUser={currentUser}
      onUpdateStatus={handleUpdateStatus}
    >
      {/* Blocker Alert Banner */}
      {activeBlockersCount > 0 && (
        <div className="p-3.5 rounded-xl bg-[#8c5e31]/10 border border-[#8c5e31]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#8c5e31] animate-pulse" />
            <span className="text-xs font-bold text-[#8c5e31]">
              {activeBlockersCount} Active Blocker{activeBlockersCount > 1 ? 's' : ''} Flagged
            </span>
            <span className="text-[11px] text-[#252724]/70 hidden sm:inline">
              Review highlighted check-ins below to unblock squad delivery.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Check-in Composer */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-black/8 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/8">
              <ClipboardCheckIcon className="w-5 h-5 text-[#5a8357]" />
              <h3 className="text-sm font-bold text-[#252724]">Submit Daily Check-in</h3>
            </div>

            <form onSubmit={handleSubmitCheckin} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#252724] mb-1">
                  1. What did you accomplish yesterday?
                </label>
                <textarea
                  rows={2}
                  required
                  value={yesterday}
                  onChange={(e) => setYesterday(e.target.value)}
                  placeholder="e.g. Shipped spatial room audio falloff..."
                  className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#252724] mb-1">
                  2. What are you planning to work on today?
                </label>
                <textarea
                  rows={2}
                  required
                  value={today}
                  onChange={(e) => setToday(e.target.value)}
                  placeholder="e.g. Adding telemetry websocket health check..."
                  className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#252724] mb-1">
                  3. Any impediments or blockers? (Optional)
                </label>
                <input
                  type="text"
                  value={blockers}
                  onChange={(e) => setBlockers(e.target.value)}
                  placeholder="e.g. Blocked on staging DB credentials..."
                  className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-2xs transition-all"
              >
                Post Daily Check-in
              </button>
            </form>
          </div>
        </div>

        {/* Right: Squad Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-black/8">
            <h3 className="text-sm font-bold text-[#252724]">Today's Squad Briefings</h3>
            <span className="text-[11px] font-mono text-[#252724]/60">
              {entries.length} Check-ins Submitted
            </span>
          </div>

          <div className="space-y-3">
            {entries.map((entry) => (
              <StandupCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
