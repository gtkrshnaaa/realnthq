'use client';

import React, { useState } from 'react';
import { ShieldCheckIcon, UserPlusIcon } from '@/components/icons/extended_icons';

interface GuestCheckinCardProps {
  onCheckinSuccess: (guestName: string, accessCode: string) => void;
}

export function GuestCheckinCard({ onCheckinSuccess }: GuestCheckinCardProps) {
  const [accessCode, setAccessCode] = useState('REALNT-9482');
  const [guestName, setGuestName] = useState('Dr. Miles Dyson');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim() || !guestName.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onCheckinSuccess(guestName, accessCode);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm max-w-md w-full mx-auto">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-black/8">
        <div className="w-10 h-10 rounded-xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center border border-[#5a8357]/20">
          <ShieldCheckIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#252724] tracking-tight">
            Guest Reception & Check-in
          </h2>
          <p className="text-xs text-[#252724]/65">
            Validate temporary visitor access pass to enter workspace
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-[#252724] mb-1">
            Visitor Full Name:
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full pl-3 pr-3 py-2.5 rounded-xl bg-[#fbfbfa] border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#252724] mb-1">
            6-Digit Access Pass Token:
          </label>
          <input
            type="text"
            required
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
            placeholder="REALNT-XXXX"
            className="w-full px-3 py-2.5 rounded-xl bg-[#fbfbfa] border border-black/10 text-xs font-mono font-semibold tracking-wider text-[#252724] focus:outline-hidden focus:border-[#668c63]"
          />
          <span className="text-[10px] text-[#252724]/50 mt-1 block">
            Sample token: REALNT-9482 (Provided by your host)
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-2xs transition-all flex items-center justify-center gap-2"
        >
          <UserPlusIcon className="w-4 h-4" />
          <span>{isSubmitting ? 'Validating Token...' : 'Enter Reception Lounge'}</span>
        </button>
      </form>
    </div>
  );
}
