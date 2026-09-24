'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { UserProfile } from '@/types/office.types';

interface RoomArtifact {
  id: string;
  roomName: string;
  authorName: string;
  title: string;
  type: 'DECISION_LOG' | 'STANDUP_NOTE' | 'SCRATCHPAD';
  createdAt: string;
  summary: string;
}

export default function ArtifactsPage() {
  const [currentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@acme.org',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
  });

  const [filter, setFilter] = useState<string>('ALL');

  const [artifacts] = useState<RoomArtifact[]>([
    {
      id: 'art-001',
      roomName: 'Turing War Room',
      authorName: 'Alex Vance',
      title: 'Decoupled SFU Media Architecture RFC',
      type: 'DECISION_LOG',
      createdAt: '2026-09-23 10:30 UTC',
      summary:
        'Agreed on separating RTP media transcoding from NestJS main thread. Mediasoup cluster deployed behind signaling tokens.',
    },
    {
      id: 'art-002',
      roomName: 'Lovelace Sync Hub',
      authorName: 'Sarah Connor',
      title: 'Sprint 42 Product Alignment Notes',
      type: 'STANDUP_NOTE',
      createdAt: '2026-09-23 09:15 UTC',
      summary:
        'Reviewed hot-desk reservation flow and soft knock audio chime tone. Design system adherence verified at 100%.',
    },
    {
      id: 'art-003',
      roomName: 'Virtual Coffee Bar',
      authorName: 'Kenji Sato',
      title: 'Spatial Quadtree Partitioning Benchmark',
      type: 'SCRATCHPAD',
      createdAt: '2026-09-22 16:45 UTC',
      summary:
        'Calculated O(k) neighbor propagation limits. Server handles 10k concurrent simulated sockets with sub-15ms tick latency.',
    },
    {
      id: 'art-004',
      roomName: 'Executive Strategy Pod',
      authorName: 'Alex Vance',
      title: 'Anti-Panopticon Privacy Charter',
      type: 'DECISION_LOG',
      createdAt: '2026-09-22 14:00 UTC',
      summary:
        'Permanent ban confirmed on keystroke counters, webcam grabs, and productivity scores. Output presence model enforced.',
    },
  ]);

  const filtered =
    filter === 'ALL' ? artifacts : artifacts.filter((a) => a.type === filter);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'DECISION_LOG':
        return 'bg-[#eef2ec] text-[#5a8357]';
      case 'STANDUP_NOTE':
        return 'bg-blue-50 text-blue-700';
      case 'SCRATCHPAD':
        return 'bg-amber-50 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout
      activePath="/artifacts"
      title="Decision Registers & Async Logs"
      subtitle="Persistent room journals, architecture decisions, and team scratchpads"
      badge="Async Audit Trail"
      currentUser={currentUser}
      actions={
        <div className="flex items-center gap-1.5 p-1 bg-[#fbfbfa] rounded-xl border border-black/8 text-xs font-medium">
          {['ALL', 'DECISION_LOG', 'STANDUP_NOTE', 'SCRATCHPAD'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg transition-all text-[11px] ${
                filter === t
                  ? 'bg-[#252724] text-white shadow-xs font-semibold'
                  : 'text-[#252724]/70 hover:text-[#252724]'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      }
    >
      <section className="bg-white rounded-2xl border border-black/8 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-black/8 gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#252724]">
              Recorded Team Artifacts
            </h2>
            <p className="text-xs text-[#252724]/70 mt-0.5">
              Knowledge records automatically preserved from collaborative spaces.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#eef2ec] text-[#5a8357]">
            {filtered.length} Entries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="p-5 rounded-xl border border-black/8 bg-[#fbfbfa] hover:border-black/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase ${getTypeBadge(
                      item.type,
                    )}`}
                  >
                    {item.type.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-mono text-[#252724]/50">
                    {item.createdAt}
                  </span>
                </div>

                <h3 className="text-base font-bold tracking-tight text-[#252724] mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#252724]/70 mt-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5 text-xs text-[#252724]/60">
                <span>Room: {item.roomName}</span>
                <span className="font-medium text-[#252724]">
                  Author: {item.authorName}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
