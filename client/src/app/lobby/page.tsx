'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { GuestCheckinCard } from '@/components/lobby/guest_checkin_card';
import { ShieldCheckIcon, ClockIcon } from '@/components/icons/extended_icons';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

export default function LobbyPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'guest-temp-01',
    email: 'visitor@external.client.com',
    fullName: 'Guest Visitor',
    displayTitle: 'External Guest',
    status: 'AVAILABLE',
    statusMessage: 'In Reception Lobby',
  });

  const [activeSession, setActiveSession] = useState<{
    guestName: string;
    accessCode: string;
    hostName: string;
    targetRoom: string;
  } | null>(null);

  const handleUpdateStatus = (status: UserPresenceStatus, message?: string) => {
    setCurrentUser((prev) => ({ ...prev, status, statusMessage: message }));
  };

  const handleCheckinSuccess = (guestName: string, accessCode: string) => {
    setActiveSession({
      guestName,
      accessCode,
      hostName: 'Alex Vance (Head of Engineering)',
      targetRoom: 'Turing War Room',
    });
    setCurrentUser((prev) => ({
      ...prev,
      fullName: guestName,
      statusMessage: `Waiting for host escort to ${accessCode}`,
    }));
  };

  return (
    <DashboardLayout
      activePath="/lobby"
      title="Reception & Guest Lobby"
      subtitle="Visitor access validation, hospitality waiting lounge, and host escort portal"
      badge="Visitor Perimeter"
      currentUser={currentUser}
      onUpdateStatus={handleUpdateStatus}
    >
      <div className="py-6">
        {!activeSession ? (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto">
              <span className="px-3 py-1 rounded-full bg-[#eef2ec] text-[#5a8357] text-xs font-semibold uppercase tracking-wider">
                External Visitor Terminal
              </span>
              <h2 className="text-xl font-black text-[#252724] tracking-tight mt-2">
                Welcome to REALNT HQ
              </h2>
              <p className="text-xs text-[#252724]/70 mt-1">
                Enter your meeting pass token to check in and alert your company host.
              </p>
            </div>

            <GuestCheckinCard onCheckinSuccess={handleCheckinSuccess} />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/8 p-8 max-w-lg mx-auto shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center mx-auto border border-[#5a8357]/20">
              <ClockIcon className="w-7 h-7 animate-spin" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#5a8357] bg-[#eef2ec] px-2.5 py-0.5 rounded-md">
                Token Verified: {activeSession.accessCode}
              </span>
              <h2 className="text-lg font-bold text-[#252724] tracking-tight mt-3">
                Waiting in Guest Hospitality Lounge
              </h2>
              <p className="text-xs text-[#252724]/70 mt-1 max-w-sm mx-auto">
                Host <strong className="text-[#252724]">{activeSession.hostName}</strong> has been notified of your arrival. You will be escorted into <strong className="text-[#252724]">{activeSession.targetRoom}</strong> shortly.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-black/8 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#252724]/60">Visitor Name:</span>
                <span className="font-semibold text-[#252724]">{activeSession.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252724]/60">Assigned Room:</span>
                <span className="font-semibold text-[#252724]">{activeSession.targetRoom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252724]/60">Privacy Boundary:</span>
                <span className="font-mono text-[#5a8357] font-semibold">Sandboxed Guest Network</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveSession(null)}
              className="text-xs text-[#252724]/60 hover:text-[#252724] underline pt-2"
            >
              Sign out / Check in with another token
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
