import React from 'react';
import { DeskData, UserProfile } from '@/types/office.types';
import { DeskTile } from './desk_tile';

interface OfficeGridProps {
  floorName: string;
  desks: DeskData[];
  currentUser: UserProfile;
  onClaimDesk: (deskId: string) => void;
  onReleaseDesk: (deskId: string) => void;
  onKnockUser: (user: UserProfile) => void;
  onOpenNote?: (desk: DeskData) => void;
  onOpenStandupKiosk?: () => void;
  onOpenFocusModal?: () => void;
  onOpenGuestModal?: () => void;
  standupCount?: number;
}

export function OfficeGrid({
  floorName,
  desks,
  currentUser,
  onClaimDesk,
  onReleaseDesk,
  onKnockUser,
  onOpenNote,
  onOpenStandupKiosk,
  onOpenFocusModal,
  onOpenGuestModal,
  standupCount = 0,
}: OfficeGridProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/8 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#252724]">
            {floorName}
          </h2>
          <p className="text-xs text-[#252724]/60">
            Spatial Desk Allocations & Ambient Team Presence
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {onOpenStandupKiosk && (
            <button
              type="button"
              onClick={onOpenStandupKiosk}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-black/10 hover:border-black/25 text-xs font-semibold text-[#252724] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5a8357]" />
              Standup Kiosk ({standupCount})
            </button>
          )}
          {onOpenFocusModal && (
            <button
              type="button"
              onClick={onOpenFocusModal}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-black/10 hover:border-black/25 text-xs font-semibold text-[#252724] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8c5e31]" />
              Deep-Work Pods
            </button>
          )}
          {onOpenGuestModal && (
            <button
              type="button"
              onClick={onOpenGuestModal}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-black/10 hover:border-black/25 text-xs font-semibold text-[#252724] transition-all shadow-2xs"
            >
              Guest Lobby
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {desks.map((desk) => (
          <DeskTile
            key={desk.id}
            desk={desk}
            currentUser={currentUser}
            onClaimDesk={onClaimDesk}
            onReleaseDesk={onReleaseDesk}
            onKnockUser={onKnockUser}
            onOpenNote={onOpenNote}
          />
        ))}
      </div>

      {/* Proximity Lounge & Watercooler Zone */}
      <div className="p-3 rounded-xl bg-[#fbfbfa] border border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#5a8357] animate-pulse" />
          <span className="font-bold text-[#252724]">Watercooler Lounge Zone</span>
          <span className="text-[10px] text-[#252724]/60 font-mono">
            Proximity Audio Attenuation Active
          </span>
        </div>
        <p className="text-[11px] text-[#252724]/70">
          Walk within 2 tiles of colleagues in this zone to initiate soft casual conversations.
        </p>
      </div>
    </div>
  );
}
