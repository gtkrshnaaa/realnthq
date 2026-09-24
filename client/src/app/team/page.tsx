'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { KnockModal } from '@/components/presence/knock_modal';
import { HandRaisedIcon } from '@/components/icons/icons';
import { UserProfile, KnockNotification } from '@/types/office.types';

export default function TeamPage() {
  const [currentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@acme.org',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
    statusMessage: 'Reviewing PRs and architecture',
    floorId: 'floor-2',
    deskId: 'desk-1',
  });

  const [teamMembers] = useState<(UserProfile & { role: string; location: string })[]>([
    {
      id: 'b0000000-0000-0000-0000-000000000001',
      email: 'admin@acme.org',
      fullName: 'Alex Vance',
      displayTitle: 'Head of Engineering',
      status: 'AVAILABLE',
      statusMessage: 'Reviewing PRs and architecture',
      floorId: 'floor-2',
      deskId: 'desk-1',
      role: 'ADMIN',
      location: 'Floor 2 (ENG-01)',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000002',
      email: 'sarah@acme.org',
      fullName: 'Sarah Connor',
      displayTitle: 'Staff Product Designer',
      status: 'DEEP_WORK',
      statusMessage: 'Finalizing Warm Editorial design tokens',
      floorId: 'floor-2',
      deskId: 'desk-2',
      role: 'MEMBER',
      location: 'Floor 2 (ENG-02)',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000003',
      email: 'kenji@acme.org',
      fullName: 'Kenji Sato',
      displayTitle: 'Distributed Systems Lead',
      status: 'AVAILABLE',
      statusMessage: 'Benchmarking WebSocket interest management',
      floorId: 'floor-2',
      deskId: 'desk-3',
      role: 'MEMBER',
      location: 'Floor 2 (ENG-03)',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000004',
      email: 'elena@acme.org',
      fullName: 'Elena Rostova',
      displayTitle: 'VP of Product',
      status: 'IN_MEETING',
      statusMessage: 'Executive strategy sync',
      floorId: 'floor-3',
      deskId: 'desk-10',
      role: 'OWNER',
      location: 'Floor 3 (STRAT-01)',
    },
  ]);

  const [targetKnockUser, setTargetKnockUser] = useState<UserProfile | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-[#5a8357]';
      case 'DEEP_WORK':
        return 'bg-[#8c5e31]';
      case 'IN_MEETING':
        return 'bg-blue-600';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <DashboardLayout
      activePath="/team"
      title="Team Directory & Presence Roster"
      subtitle="Role-based workplace presence, spatial locations, and instant collaboration"
      badge="Active Roster"
      currentUser={currentUser}
      actions={
        <span className="px-3 py-1.5 rounded-xl bg-[#eef2ec] text-[#5a8357] text-xs font-mono font-semibold">
          {teamMembers.length} Active Members
        </span>
      }
    >
      <section className="bg-white rounded-2xl border border-black/8 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-black/8 gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#252724]">
              Colleague Roster
            </h2>
            <p className="text-xs text-[#252724]/70 mt-0.5">
              Instant non-intrusive soft knocks mimic tapping a teammate on the shoulder.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {teamMembers.map((member) => {
            const isSelf = member.id === currentUser.id;
            return (
              <div
                key={member.id}
                className="p-5 rounded-xl border border-black/8 bg-[#fbfbfa] hover:border-black/20 transition-all flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#252724] text-white flex items-center justify-center text-sm font-semibold">
                      {member.fullName.charAt(0)}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                        member.status,
                      )}`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold tracking-tight text-[#252724]">
                        {member.fullName}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/5 text-[#252724]/70">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-xs text-[#252724]/70 mt-0.5">
                      {member.displayTitle}
                    </p>
                    <p className="text-[11px] text-[#252724]/50 font-mono mt-1">
                      {member.location}
                    </p>

                    {member.statusMessage && (
                      <p className="text-xs text-[#252724]/80 italic mt-2">
                        "{member.statusMessage}"
                      </p>
                    )}
                  </div>
                </div>

                {!isSelf && (
                  <button
                    onClick={() => setTargetKnockUser(member)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/10 hover:border-black/25 text-[#252724] text-xs font-medium transition-all shadow-xs shrink-0"
                  >
                    <HandRaisedIcon className="w-3.5 h-3.5 text-[#5a8357]" />
                    <span>Knock</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {targetKnockUser && (
        <KnockModal
          targetUser={targetKnockUser}
          onClose={() => setTargetKnockUser(null)}
          onSendKnock={() => setTargetKnockUser(null)}
          onRespondKnock={() => setTargetKnockUser(null)}
        />
      )}
    </DashboardLayout>
  );
}
