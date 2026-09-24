'use client';

import React, { useState } from 'react';
import { XMarkIcon } from '@/components/icons/icons';
import { PencilIcon } from '@/components/icons/extended_icons';

interface DeskNoteModalProps {
  isOpen: boolean;
  deskLabel: string;
  initialNote?: string;
  onClose: () => void;
  onSaveNote: (note: string) => void;
  onClearNote: () => void;
}

export function DeskNoteModal({
  isOpen,
  deskLabel,
  initialNote = '',
  onClose,
  onSaveNote,
  onClearNote,
}: DeskNoteModalProps) {
  const [noteText, setNoteText] = useState(initialNote);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-[#fbfbfa] rounded-2xl border border-black/10 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center border border-[#5a8357]/20">
              <PencilIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#252724]">
                Desk Sticky Note
              </h3>
              <p className="text-[10px] text-[#252724]/60 font-mono">
                {deskLabel}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#252724]/50 hover:bg-black/5"
            aria-label="Close note modal"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-[#252724] mb-1">
              Leave a message on your desk:
            </label>
            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. In customer interview until 3 PM. Ping on Slack for urgent issues."
              className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {initialNote ? (
              <button
                type="button"
                onClick={() => {
                  onClearNote();
                  onClose();
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Remove Note
              </button>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl border border-black/10 text-xs text-[#252724] hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSaveNote(noteText);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-xs"
              >
                Stick to Desk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
