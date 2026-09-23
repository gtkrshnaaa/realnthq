import React from 'react';
import { DeskData, UserProfile } from '@/types/office.types';

interface DeskTileProps {
  desk: DeskData;
  currentUser: UserProfile;
  onClaimDesk: (deskId: string) => void;
  onReleaseDesk: (deskId: string) => void;
  onKnockUser: (user: UserProfile) => void;
}

export function DeskTile({
  desk,
  currentUser,
  onClaimDesk,
  onReleaseDesk,
  onKnockUser,
}: DeskTileProps) {
  const isOccupiedByMe = desk.currentOccupant?.id === currentUser.id;
  const isOccupiedByOther = desk.currentOccupant && !isOccupiedByMe;
  const isVacant = !desk.currentOccupant;

  return (
    <div
      className={`relative p-3.5 rounded-2xl border transition-all ${
        isOccupiedByMe
          ? 'bg-[#eef2ec] border-[#668c63] ring-1 ring-[#668c63]/40'
          : isOccupiedByOther
          ? 'bg-white border-black/8 shadow-sm hover:border-black/20'
          : 'bg-white/60 border-dashed border-black/15 hover:bg-white hover:border-black/25'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono font-medium text-[#252724]/60">
          {desk.deskLabel}
        </span>
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
            desk.deskType === 'DEDICATED'
              ? 'bg-[#eef2ec] text-[#5a8357]'
              : 'bg-black/5 text-[#252724]/70'
          }`}
        >
          {desk.deskType === 'DEDICATED' ? 'Reserved' : 'Hot Desk'}
        </span>
      </div>

      {desk.currentOccupant ? (
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-[#252724] text-white flex items-center justify-center text-[10px] font-semibold">
              {desk.currentOccupant.fullName.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[#252724] truncate">
                {desk.currentOccupant.fullName}
              </p>
              <p className="text-[10px] text-[#252724]/60 truncate">
                {desk.currentOccupant.displayTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium ${
                desk.currentOccupant.status === 'AVAILABLE'
                  ? 'text-[#5a8357]'
                  : desk.currentOccupant.status === 'DEEP_WORK'
                  ? 'text-[#8c5e31]'
                  : 'text-[#252724]/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {desk.currentOccupant.status}
            </span>

            {isOccupiedByMe ? (
              <button
                onClick={() => onReleaseDesk(desk.id)}
                className="text-[10px] text-red-600 hover:text-red-700 font-medium"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={() => onKnockUser(desk.currentOccupant!)}
                className="px-2 py-0.5 rounded-md bg-[#252724] hover:bg-[#3b3e39] text-white text-[10px] font-medium transition-all"
              >
                Knock
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="py-2 text-center">
          <p className="text-[11px] text-[#252724]/50 mb-2">Available</p>
          <button
            onClick={() => onClaimDesk(desk.id)}
            className="w-full py-1 rounded-xl bg-white border border-black/10 hover:border-black/30 text-[#252724] text-[11px] font-medium transition-all"
          >
            Sit Here
          </button>
        </div>
      )}
    </div>
  );
}
