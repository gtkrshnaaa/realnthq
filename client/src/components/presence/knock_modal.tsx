import React, { useState } from 'react';
import { UserProfile, KnockNotification } from '@/types/office.types';
import { HandRaisedIcon } from '@/components/icons/icons';

interface KnockModalProps {
  targetUser?: UserProfile | null;
  incomingKnock?: KnockNotification | null;
  onClose: () => void;
  onSendKnock: (targetUserId: string, message: string) => void;
  onRespondKnock: (knockId: string, decision: 'ACCEPTED' | 'BUSY' | 'LATER') => void;
}

export function KnockModal({
  targetUser,
  incomingKnock,
  onClose,
  onSendKnock,
  onRespondKnock,
}: KnockModalProps) {
  const [message, setMessage] = useState('Quick 5-min sync?');

  if (incomingKnock) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
        <div className="w-full max-w-md bg-[#fbfbfa] rounded-2xl border border-black/10 p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#5a8357] text-white flex items-center justify-center">
              <HandRaisedIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-[#252724]">
                Incoming Soft Knock
              </h3>
              <p className="text-xs text-[#252724]/70">
                {incomingKnock.fromUserName} is tapping your desk
              </p>
            </div>
          </div>

          {incomingKnock.message && (
            <div className="p-3 mb-5 rounded-xl bg-white border border-black/5 text-xs text-[#252724]/80 italic">
              "{incomingKnock.message}"
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onRespondKnock(incomingKnock.knockId, 'ACCEPTED')}
              className="py-2 px-3 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold transition-all shadow-sm"
            >
              Accept
            </button>
            <button
              onClick={() => onRespondKnock(incomingKnock.knockId, 'LATER')}
              className="py-2 px-3 rounded-xl bg-white border border-black/10 hover:border-black/25 text-[#252724] text-xs font-medium transition-all"
            >
              In 5 Mins
            </button>
            <button
              onClick={() => onRespondKnock(incomingKnock.knockId, 'BUSY')}
              className="py-2 px-3 rounded-xl bg-white border border-black/10 hover:border-black/25 text-red-600 text-xs font-medium transition-all"
            >
              Busy Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!targetUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-[#fbfbfa] rounded-2xl border border-black/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#252724] text-white flex items-center justify-center text-sm font-semibold">
              {targetUser.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#252724]">
                Knock on {targetUser.fullName}
              </h3>
              <p className="text-xs text-[#252724]/60">
                {targetUser.displayTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#252724]/50 hover:text-[#252724]"
          >
            Cancel
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-[#252724]/70 mb-1.5">
            Brief Note (Optional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-none focus:ring-1 focus:ring-[#668c63]"
            placeholder="e.g., Quick question about API schema"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-black/10 hover:border-black/25 text-[#252724] text-xs font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSendKnock(targetUser.id, message);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold transition-all shadow-sm"
          >
            Send Soft Knock
          </button>
        </div>
      </div>
    </div>
  );
}
