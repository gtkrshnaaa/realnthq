import React from 'react';
import { UserPresenceStatus } from '@/types/office.types';

interface StatusSelectorProps {
  currentStatus: UserPresenceStatus;
  statusMessage?: string;
  onUpdateStatus: (status: UserPresenceStatus, message?: string) => void;
}

export function StatusSelector({
  currentStatus,
  statusMessage,
  onUpdateStatus,
}: StatusSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const statuses: { label: string; value: UserPresenceStatus; color: string }[] = [
    { label: 'Available', value: 'AVAILABLE', color: 'bg-[#5a8357]' },
    { label: 'Deep Work (DND)', value: 'DEEP_WORK', color: 'bg-[#8c5e31]' },
    { label: 'In Meeting', value: 'IN_MEETING', color: 'bg-blue-600' },
    { label: 'Away', value: 'AWAY', color: 'bg-gray-400' },
  ];

  const active = statuses.find((s) => s.value === currentStatus) || statuses[0];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-black/10 hover:border-black/25 text-xs font-medium text-[#252724] transition-all shadow-sm"
      >
        <span className={`w-2 h-2 rounded-full ${active.color}`} />
        <span>{active.label}</span>
        <svg className="w-3.5 h-3.5 text-[#252724]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl border border-black/10 shadow-lg p-1.5 z-50">
          {statuses.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onUpdateStatus(item.value, statusMessage);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-medium text-[#252724] hover:bg-[#eef2ec] transition-all"
            >
              <span className={`w-2 h-2 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
