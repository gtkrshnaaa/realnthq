'use client';

import React, { useState } from 'react';
import { XMarkIcon } from '@/components/icons/icons';
import { ClockIcon, ShieldCheckIcon } from '@/components/icons/extended_icons';

interface FocusModeModalProps {
  isOpen: boolean;
  currentRemainingMinutes?: number;
  currentGoal?: string;
  onClose: () => void;
  onStartFocus: (durationMinutes: number, goal: string) => void;
  onEndFocus: () => void;
}

export function FocusModeModal({
  isOpen,
  currentRemainingMinutes,
  currentGoal,
  onClose,
  onStartFocus,
  onEndFocus,
}: FocusModeModalProps) {
  const [duration, setDuration] = useState(25);
  const [goal, setGoal] = useState(currentGoal || 'Deep architecture review');

  if (!isOpen) return null;

  const isFocusing = (currentRemainingMinutes ?? 0) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-[#fbfbfa] rounded-2xl border border-black/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8c5e31] text-white flex items-center justify-center">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#252724]">
                {isFocusing ? 'Active Focus Session' : 'Enter Deep-Work Pod'}
              </h3>
              <p className="text-xs text-[#252724]/60">
                Flow protection and buffered interruption queuing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#252724]/50 hover:bg-black/5 hover:text-[#252724]"
            aria-label="Close focus modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {isFocusing ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-[#8c5e31]/20 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c5e31]">
                Time Remaining in Flow
              </span>
              <p className="text-3xl font-black tracking-tight text-[#252724] my-1 font-mono">
                {currentRemainingMinutes}m
              </p>
              <p className="text-xs text-[#252724]/70 italic truncate">
                "{currentGoal}"
              </p>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#eef2ec] text-[#5a8357] text-xs">
              <ShieldCheckIcon className="w-4 h-4 shrink-0" />
              <span>Incoming knocks are safely buffered in your desk tray.</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onEndFocus}
                className="w-full py-2.5 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold transition-all shadow-xs"
              >
                End Focus Session & Review Tray
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#252724] mb-1.5">
                Focus Objective
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="What are you focusing on?"
                className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#252724] mb-1.5">
                Session Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                      duration === mins
                        ? 'bg-[#252724] text-white border-[#252724]'
                        : 'bg-white border-black/10 text-[#252724] hover:border-black/25'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-black/4 text-xs text-[#252724]/70">
              <ShieldCheckIcon className="w-4 h-4 text-[#8c5e31] shrink-0" />
              <span>Colleagues will see your focus countdown and knocks will be queued silently.</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-black/10 text-xs font-medium text-[#252724] hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={() => onStartFocus(duration, goal)}
                className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-xs"
              >
                Start Deep Work ({duration}m)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
