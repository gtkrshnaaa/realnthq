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
}

export function OfficeGrid({
  floorName,
  desks,
  currentUser,
  onClaimDesk,
  onReleaseDesk,
  onKnockUser,
}: OfficeGridProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/8 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#252724]">
            {floorName}
          </h2>
          <p className="text-xs text-[#252724]/60">
            Spatial Desk Allocations & Ambient Team Presence
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#252724]/70">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5a8357]" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8c5e31]" />
            Deep Work
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            In Meeting
          </span>
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
          />
        ))}
      </div>
    </div>
  );
}
