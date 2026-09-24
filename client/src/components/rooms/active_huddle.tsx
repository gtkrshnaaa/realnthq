import React, { useState } from 'react';
import { RoomData, UserProfile } from '@/types/office.types';
import { MicIcon, VideoIcon } from '@/components/icons/icons';

interface ActiveHuddleProps {
  room: RoomData;
  currentUser: UserProfile;
  onLeave: () => void;
}

export function ActiveHuddle({ room, currentUser, onLeave }: ActiveHuddleProps) {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(false);
  const [scratchpad, setScratchpad] = useState(
    '### Huddle Artifact\n- Objective: Align on deployment scripts\n- Decisions: Single-enter deploy.sh approved',
  );

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 shadow-2xl p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5a8357] animate-pulse" />
            <h3 className="text-sm font-bold tracking-tight text-[#252724]">
              Active Huddle: {room.name}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#eef2ec] text-[#5a8357] font-medium">
              WebRTC Audio/Video
            </span>
          </div>
          <p className="text-xs text-[#252724]/60">
            Connected as {currentUser.fullName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMicActive(!micActive)}
            className={`p-2.5 rounded-xl border transition-all ${
              micActive
                ? 'bg-[#eef2ec] border-[#668c63] text-[#5a8357]'
                : 'bg-red-50 border-red-200 text-red-600'
            }`}
            title="Toggle Microphone"
          >
            <MicIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setVideoActive(!videoActive)}
            className={`p-2.5 rounded-xl border transition-all ${
              videoActive
                ? 'bg-[#eef2ec] border-[#668c63] text-[#5a8357]'
                : 'bg-black/5 border-black/10 text-[#252724]/60'
            }`}
            title="Toggle Camera"
          >
            <VideoIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onLeave}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all shadow-sm"
          >
            Leave Room
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-black/5">
        <label className="block text-[11px] font-semibold text-[#252724]/70 mb-1">
          Async Decision Log (Auto-persisted to room)
        </label>
        <textarea
          rows={2}
          value={scratchpad}
          onChange={(e) => setScratchpad(e.target.value)}
          className="w-full px-3 py-1.5 rounded-xl bg-[#fbfbfa] border border-black/10 text-xs font-mono text-[#252724] focus:outline-none focus:ring-1 focus:ring-[#668c63]"
        />
      </div>
    </div>
  );
}
