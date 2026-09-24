'use client';

import React, { useState } from 'react';
import { StandupEntry } from '@/types/office.types';
import { XMarkIcon } from '@/components/icons/icons';
import { ClipboardCheckIcon } from '@/components/icons/extended_icons';

interface StandupKioskModalProps {
  isOpen: boolean;
  entries: StandupEntry[];
  currentUserId: string;
  currentUserName: string;
  currentUserTitle: string;
  onClose: () => void;
  onSubmitCheckin: (entry: Omit<StandupEntry, 'id' | 'timestamp'>) => void;
}

export function StandupKioskModal({
  isOpen,
  entries,
  currentUserId,
  currentUserName,
  currentUserTitle,
  onClose,
  onSubmitCheckin,
}: StandupKioskModalProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'submit'>('feed');
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yesterday.trim() || !today.trim()) return;
    onSubmitCheckin({
      userId: currentUserId,
      userName: currentUserName,
      displayTitle: currentUserTitle,
      yesterday,
      today,
      blockers: blockers.trim() || undefined,
    });
    setYesterday('');
    setToday('');
    setBlockers('');
    setActiveTab('feed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-[#fbfbfa] rounded-2xl border border-black/10 p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5a8357] text-white flex items-center justify-center">
              <ClipboardCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#252724]">
                Daily Standup Kiosk
              </h3>
              <p className="text-xs text-[#252724]/60">
                Asynchronous daily check-ins across distributed timezones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#252724]/50 hover:bg-black/5"
            aria-label="Close standup kiosk"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-black/8 mt-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`py-2 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'feed'
                ? 'border-[#252724] text-[#252724]'
                : 'border-transparent text-[#252724]/50 hover:text-[#252724]'
            }`}
          >
            Team Briefings ({entries.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`py-2 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'submit'
                ? 'border-[#252724] text-[#252724]'
                : 'border-transparent text-[#252724]/50 hover:text-[#252724]'
            }`}
          >
            Post My Check-in
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {activeTab === 'feed' ? (
            entries.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#252724]/50">
                No check-ins recorded for today yet. Be the first to check in.
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-xl bg-white border border-black/8 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#252724]">
                        {entry.userName}
                      </p>
                      <p className="text-[10px] text-[#252724]/60">
                        {entry.displayTitle}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#252724]/50">
                      {entry.timestamp}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#252724]/85">
                    <div>
                      <span className="font-semibold text-[#5a8357]">Yesterday:</span>{' '}
                      {entry.yesterday}
                    </div>
                    <div>
                      <span className="font-semibold text-[#252724]">Today:</span>{' '}
                      {entry.today}
                    </div>
                    {entry.blockers && (
                      <div className="text-red-700 bg-red-50/70 p-2 rounded-lg border border-red-200/50">
                        <span className="font-semibold">Blockers:</span> {entry.blockers}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#252724] mb-1">
                  What did you complete yesterday?
                </label>
                <textarea
                  required
                  rows={2}
                  value={yesterday}
                  onChange={(e) => setYesterday(e.target.value)}
                  placeholder="e.g. Shipped OAuth authorization middleware and fixed migration index"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252724] mb-1">
                  What is on your focus roadmap today?
                </label>
                <textarea
                  required
                  rows={2}
                  value={today}
                  onChange={(e) => setToday(e.target.value)}
                  placeholder="e.g. Implementing spatial presence quadtree and load testing WebSocket room bounds"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252724] mb-1">
                  Any blockers or dependencies? (Optional)
                </label>
                <input
                  type="text"
                  value={blockers}
                  onChange={(e) => setBlockers(e.target.value)}
                  placeholder="e.g. Awaiting AWS staging credentials from DevOps"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('feed')}
                  className="px-4 py-2 rounded-xl border border-black/10 text-xs text-[#252724] hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-xs"
                >
                  Publish Check-in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
