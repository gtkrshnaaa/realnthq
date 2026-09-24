'use client';

import React from 'react';
import { BufferedKnock } from '@/types/office.types';
import { BellIcon, XMarkIcon } from '@/components/icons/icons';

interface BufferedKnockDrawerProps {
  isOpen: boolean;
  knocks: BufferedKnock[];
  onClose: () => void;
  onClearKnock: (knockId: string) => void;
  onReplyKnock: (knock: BufferedKnock) => void;
}

export function BufferedKnockDrawer({
  isOpen,
  knocks,
  onClose,
  onClearKnock,
  onReplyKnock,
}: BufferedKnockDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-[#fbfbfa] h-full shadow-2xl border-l border-black/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-black/8 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8c5e31] text-white flex items-center justify-center">
              <BellIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#252724]">
                Desk Tray: Buffered Knocks
              </h3>
              <p className="text-[11px] text-[#252724]/60">
                {knocks.length} queued interactions from focus mode
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#252724]/50 hover:bg-black/5"
            aria-label="Close tray"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* List of Buffered Knocks */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {knocks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-black/5 flex items-center justify-center mb-2 text-[#252724]/40">
                <BellIcon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#252724]">Tray is clear</p>
              <p className="text-[11px] text-[#252724]/50 mt-0.5">
                No buffered interactions. Focus mode was uninterrupted.
              </p>
            </div>
          ) : (
            knocks.map((k) => (
              <div
                key={k.knockId}
                className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-[#252724]">
                      {k.fromUserName}
                    </p>
                    <p className="text-[10px] text-[#252724]/50 font-mono">
                      Queued at {new Date(k.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#eef2ec] text-[#5a8357]">
                    Buffered
                  </span>
                </div>

                {k.message && (
                  <p className="p-2 rounded-lg bg-[#fbfbfa] text-xs text-[#252724]/80 italic border border-black/5">
                    "{k.message}"
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-1 border-t border-black/5">
                  <button
                    onClick={() => onClearKnock(k.knockId)}
                    className="text-[11px] text-[#252724]/60 hover:text-red-600 font-medium px-2 py-1"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      onReplyKnock(k);
                      onClearKnock(k.knockId);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#252724] hover:bg-[#3b3e39] text-white text-[11px] font-semibold"
                  >
                    Quick Connect
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
