'use client';

import React, { useState } from 'react';
import { MegaphoneIcon, XMarkIcon } from '@/components/icons/icons';

export interface CompanyAnnouncement {
  id: string;
  title: string;
  category: 'ALL_HANDS' | 'FACILITIES' | 'SECURITY' | 'SOCIAL';
  categoryLabel: string;
  time: string;
  author: string;
  summary: string;
  isUrgent?: boolean;
}

const DEFAULT_ANNOUNCEMENTS: CompanyAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Quarterly All-Hands Strategy Townhall',
    category: 'ALL_HANDS',
    categoryLabel: 'All-Hands',
    time: 'Today, 15:00 UTC',
    author: 'Alex Vance (Engineering Lead)',
    summary:
      'All squad members gather at Turing War Room for the Q4 architecture roadmap & spatial protocol updates.',
    isUrgent: true,
  },
  {
    id: 'ann-2',
    title: 'Floor 3 Quiet Focus Library Now Active',
    category: 'FACILITIES',
    categoryLabel: 'Facilities',
    time: 'Yesterday',
    author: 'Sarah Connor (Product Design)',
    summary:
      'Level 3 is now reserved for silent solo deep work. Soft knocks in this zone automatically defer to async status messages.',
  },
  {
    id: 'ann-3',
    title: 'Anti-Panopticon Privacy Protocol Passed',
    category: 'SECURITY',
    categoryLabel: 'Security',
    time: '2 days ago',
    author: 'Security & Compliance Guild',
    summary:
      'Annual enterprise verification confirmed zero keystroke counting, zero background webcam capture, and full local encryption.',
  },
  {
    id: 'ann-4',
    title: 'Virtual Happy Hour & Demo Lightning Talks',
    category: 'SOCIAL',
    categoryLabel: 'Social',
    time: 'Friday, 17:00 UTC',
    author: 'Dev Squad Culture Guild',
    summary:
      'Weekly open mic and lightning demos at Virtual Coffee Bar. Team members across all time zones are welcome to share casual updates.',
  },
];

interface BulletinPanelProps {
  onClose?: () => void;
}

export function BulletinPanel({ onClose }: BulletinPanelProps) {
  const [filter, setFilter] = useState<string>('ALL');
  const [announcements] = useState<CompanyAnnouncement[]>(DEFAULT_ANNOUNCEMENTS);

  const filtered =
    filter === 'ALL'
      ? announcements
      : announcements.filter((a) => a.category === filter);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'ALL_HANDS':
        return 'bg-[#eef2ec] text-[#5a8357] border-[#5a8357]/20';
      case 'FACILITIES':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'SECURITY':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'SOCIAL':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <aside className="w-80 bg-white flex flex-col h-full border-l border-black/8 shrink-0 select-none">
      {/* Panel Top Header - Fixed h-16 for Continuous Line Alignment */}
      <div className="h-16 px-4 border-b border-black/8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#eef2ec] text-[#5a8357]">
            <MegaphoneIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-sm font-bold text-[#252724] leading-none">
              Company Portal
            </h2>
            <p className="text-[10px] text-[#252724]/60 mt-0.5">
              Live Announcements
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eef2ec] text-[#5a8357] text-[10px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5a8357] animate-pulse" />
            <span>{announcements.length} Feed</span>
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-[#252724]/60 hover:text-[#252724] hover:bg-black/5"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="px-3 py-2 border-b border-black/8 bg-[#fbfbfa]/60 flex items-center gap-1 overflow-x-auto text-[10px] font-medium shrink-0">
        {['ALL', 'ALL_HANDS', 'FACILITIES', 'SECURITY', 'SOCIAL'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-2.5 py-1 rounded-md transition-all shrink-0 ${
              filter === cat
                ? 'bg-[#252724] text-white shadow-xs font-semibold'
                : 'text-[#252724]/70 hover:bg-black/5 hover:text-[#252724]'
            }`}
          >
            {cat === 'ALL' ? 'All Feed' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Announcements Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="p-3 rounded-xl border border-black/8 bg-[#fbfbfa] hover:border-black/20 hover:bg-white transition-all shadow-2xs"
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${getBadgeStyle(
                  item.category,
                )}`}
              >
                {item.categoryLabel}
              </span>
              <span className="text-[10px] font-mono text-[#252724]/50">
                {item.time}
              </span>
            </div>

            <h3 className="text-xs font-bold text-[#252724] leading-snug">
              {item.title}
            </h3>

            <p className="text-[11px] text-[#252724]/70 mt-1 leading-relaxed">
              {item.summary}
            </p>

            <div className="mt-2.5 pt-1.5 border-t border-black/5 text-[10px] text-[#252724]/50 flex items-center justify-between">
              <span className="truncate">{item.author}</span>
              {item.isUrgent && (
                <span className="text-amber-700 font-medium">Broadcast</span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-black/8 bg-[#fbfbfa]/80 shrink-0 text-center">
        <p className="text-[10px] text-[#252724]/60">
          Asynchronous Company Portal for all headquarters members.
        </p>
      </div>
    </aside>
  );
}
