'use client';

import React, { useState } from 'react';
import { WhiteboardNote } from '@/types/office.types';
import { XMarkIcon, DocumentTextIcon } from '@/components/icons/icons';

interface WhiteboardModalProps {
  isOpen: boolean;
  roomName: string;
  roomId: string;
  authorName: string;
  notes: WhiteboardNote[];
  onClose: () => void;
  onSaveNote: (note: Omit<WhiteboardNote, 'id' | 'updatedAt'>) => void;
  onExportToDecisionLog: (note: WhiteboardNote) => void;
}

export function WhiteboardModal({
  isOpen,
  roomName,
  roomId,
  authorName,
  notes,
  onClose,
  onSaveNote,
  onExportToDecisionLog,
}: WhiteboardModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSaveNote({
      roomId,
      title: title.trim(),
      content: content.trim(),
      authorName,
    });
    setTitle('');
    setContent('');
  };

  const handleExport = (note: WhiteboardNote) => {
    onExportToDecisionLog(note);
    setExportNotice(`"${note.title}" exported to Decision Registers & Async Artifacts.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-[#fbfbfa] rounded-2xl border border-black/10 p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#252724] text-white flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#252724]">
                Room Scratchpad & Whiteboard
              </h3>
              <p className="text-xs text-[#252724]/60">
                Persistent room canvas for {roomName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#252724]/50 hover:bg-black/5"
            aria-label="Close scratchpad"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {exportNotice && (
          <div className="mt-3 p-2.5 rounded-xl bg-[#eef2ec] border border-[#5a8357]/20 text-xs text-[#5a8357] font-medium shrink-0">
            {exportNotice}
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          {/* Existing Room Notes / Drawings */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#252724]/50">
              Shared Notes & Decisions ({notes.length})
            </span>
            {notes.length === 0 ? (
              <p className="text-xs text-[#252724]/50 py-4 text-center bg-white rounded-xl border border-black/5">
                No notes on this room canvas yet. Write decisions or architectural thoughts below.
              </p>
            ) : (
              notes.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-xl bg-white border border-black/8 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#252724]">{n.title}</h4>
                    <span className="text-[10px] text-[#252724]/50 font-mono">
                      By {n.authorName} - {n.updatedAt}
                    </span>
                  </div>
                  <pre className="text-xs text-[#252724]/80 whitespace-pre-wrap font-sans bg-[#fbfbfa] p-3 rounded-lg border border-black/5">
                    {n.content}
                  </pre>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleExport(n)}
                      className="px-3 py-1 rounded-lg bg-[#eef2ec] hover:bg-[#e7f2e4] text-[#5a8357] text-xs font-semibold border border-[#5a8357]/20"
                    >
                      Export to Decision Log
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="p-4 rounded-xl bg-white border border-black/8 space-y-3">
            <span className="block text-xs font-bold text-[#252724]">
              Add Scratchpad Note or Meeting Decision
            </span>
            <div>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Decision title or topic summary"
                className="w-full px-3 py-1.5 rounded-xl border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
              />
            </div>
            <div>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Key takeaways, system design points, or agreed next steps..."
                className="w-full px-3 py-2 rounded-xl border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl border border-black/10 text-xs text-[#252724] hover:bg-black/5"
              >
                Done
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-xs"
              >
                Save to Canvas
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
