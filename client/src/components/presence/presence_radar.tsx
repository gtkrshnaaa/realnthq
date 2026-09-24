import React from 'react';
import { UserProfile } from '@/types/office.types';
import { RadioIcon, UsersIcon } from '@/components/icons/icons';

interface PresenceRadarProps {
  occupants: UserProfile[];
  currentUserId: string;
  onKnockUser: (user: UserProfile) => void;
}

export function PresenceRadar({ occupants, currentUserId, onKnockUser }: PresenceRadarProps) {
  return (
    <div className="bg-[#fbfbfa] rounded-2xl border border-black/8 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
        <div className="flex items-center gap-2">
          <RadioIcon className="w-4 h-4 text-[#5a8357] animate-pulse" />
          <h3 className="text-sm font-bold tracking-tight text-[#252724]">
            Presence Radar
          </h3>
        </div>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eef2ec] text-[#5a8357] text-[11px] font-mono">
          <UsersIcon className="w-3.5 h-3.5" />
          {occupants.length} online
        </span>
      </div>

      <div className="space-y-2">
        {occupants.map((user) => {
          const isMe = user.id === currentUserId;
          return (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded-xl bg-white border border-black/5 hover:border-black/15 transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-7 h-7 rounded-full bg-[#252724] text-white flex items-center justify-center text-xs font-semibold">
                  {user.fullName.charAt(0)}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-[#252724] truncate">
                    {user.fullName} {isMe && '(You)'}
                  </p>
                  <p className="text-[10px] text-[#252724]/60 truncate">
                    {user.displayTitle}
                  </p>
                </div>
              </div>

              {!isMe && (
                <button
                  onClick={() => onKnockUser(user)}
                  className="px-2.5 py-1 rounded-lg bg-[#252724] hover:bg-[#3b3e39] text-white text-[10px] font-medium transition-all"
                >
                  Knock
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
