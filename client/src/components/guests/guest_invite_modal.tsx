'use client';

import React, { useState } from 'react';
import { GuestPass } from '@/types/office.types';
import { XMarkIcon } from '@/components/icons/icons';
import { UserPlusIcon } from '@/components/icons/extended_icons';

interface GuestInviteModalProps {
  isOpen: boolean;
  guests: GuestPass[];
  availableRooms: string[];
  onClose: () => void;
  onCreatePass: (guestName: string, targetRoomName: string) => void;
  onEscortGuest: (guestId: string) => void;
}

export function GuestInviteModal({
  isOpen,
  guests,
  availableRooms,
  onClose,
  onCreatePass,
  onEscortGuest,
}: GuestInviteModalProps) {
  const [guestName, setGuestName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(availableRooms[0] || 'Turing War Room');
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    onCreatePass(guestName.trim(), selectedRoom);
    setCreatedCode(`REALNT-GUEST-${Math.floor(1000 + Math.random() * 9000)}`);
    setGuestName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-[#fbfbfa] rounded-2xl border border-black/10 p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#252724] text-white flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#252724]">
                Guest Reception & Visitor Gateway
              </h3>
              <p className="text-xs text-[#252724]/60">
                Generate temporary lobby passes for external guests
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#252724]/50 hover:bg-black/5"
            aria-label="Close guest modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          {/* Active Lobby Waiting List */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#252724]/50 mb-2">
              Visitors in Reception Lobby ({guests.filter((g) => g.status === 'WAITING_LOBBY').length})
            </span>
            {guests.length === 0 ? (
              <p className="text-xs text-[#252724]/50 py-3 text-center bg-white rounded-xl border border-black/5">
                No external visitors currently in lobby.
              </p>
            ) : (
              <div className="space-y-2">
                {guests.map((g) => (
                  <div
                    key={g.id}
                    className="p-3 rounded-xl bg-white border border-black/8 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#252724]">
                          {g.guestName}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                            g.status === 'WAITING_LOBBY'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
                              : 'bg-[#eef2ec] text-[#5a8357]'
                          }`}
                        >
                          {g.status === 'WAITING_LOBBY' ? 'Waiting in Lobby' : 'In Session'}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#252724]/60 mt-0.5">
                        Assigned: {g.targetRoomName} | Pass: <code className="font-mono">{g.accessCode}</code>
                      </p>
                    </div>

                    {g.status === 'WAITING_LOBBY' && (
                      <button
                        onClick={() => onEscortGuest(g.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shrink-0 shadow-2xs"
                      >
                        Escort to Room
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* New Pass Generator */}
          <form onSubmit={handleGenerate} className="p-4 rounded-xl bg-white border border-black/8 space-y-3">
            <span className="block text-xs font-bold text-[#252724]">
              Issue New Visitor Pass
            </span>

            <div>
              <label className="block text-[11px] font-medium text-[#252724]/80 mb-1">
                Guest Full Name / Organization
              </label>
              <input
                required
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Elena Rostova (Acme Corp Auditor)"
                className="w-full px-3 py-1.5 rounded-xl border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#252724]/80 mb-1">
                Designated Room
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-black/10 text-xs text-[#252724] bg-white focus:outline-hidden"
              >
                {availableRooms.map((rm) => (
                  <option key={rm} value={rm}>
                    {rm}
                  </option>
                ))}
              </select>
            </div>

            {createdCode && (
              <div className="p-2.5 rounded-xl bg-[#eef2ec] border border-[#5a8357]/20 text-xs text-[#5a8357]">
                <p className="font-semibold">Visitor Pass Generated:</p>
                <p className="font-mono text-xs mt-0.5 select-all">Code: {createdCode}</p>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-xs"
              >
                Issue Visitor Access Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
