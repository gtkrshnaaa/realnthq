'use client';

import React from 'react';
import { StandupEntry } from '@/types/office.types';

interface StandupCardProps {
  entry: StandupEntry;
  onOfferHelp?: (entry: StandupEntry) => void;
}

export function StandupCard({ entry, onOfferHelp }: StandupCardProps) {
  const hasBlockers = Boolean(entry.blockers && entry.blockers.trim().length > 0);

  return (
    <div
      className={`p-4 rounded-xl border bg-white shadow-2xs transition-all ${
        hasBlockers ? 'border-[#8c5e31]/40' : 'border-black/8 hover:border-black/15'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#252724] text-white flex items-center justify-center text-xs font-bold">
            {entry.userName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <span className="text-xs font-bold text-[#252724] block">{entry.userName}</span>
            <span className="text-[10px] text-[#252724]/60">{entry.displayTitle}</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[#252724]/40">{entry.timestamp}</span>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#252724]/50 block">
            Yesterday:
          </span>
          <p className="text-[#252724]/85 pl-2 border-l border-[#5a8357]/40">{entry.yesterday}</p>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#252724]/50 block">
            Today:
          </span>
          <p className="text-[#252724]/85 pl-2 border-l border-[#252724]/30">{entry.today}</p>
        </div>

        {hasBlockers && (
          <div className="mt-2.5 p-2 rounded-lg bg-[#8c5e31]/10 border border-[#8c5e31]/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c5e31]">
                Impediment / Blocker:
              </span>
              {onOfferHelp && (
                <button
                  type="button"
                  onClick={() => onOfferHelp(entry)}
                  className="text-[10px] font-semibold text-[#8c5e31] hover:underline"
                >
                  Offer Help &rarr;
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#8c5e31] font-medium mt-0.5">{entry.blockers}</p>
          </div>
        )}
      </div>
    </div>
  );
}
