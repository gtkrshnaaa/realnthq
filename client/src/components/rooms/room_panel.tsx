import React from 'react';
import { RoomData } from '@/types/office.types';
import { VideoIcon, UsersIcon } from '@/components/icons/icons';

interface RoomPanelProps {
  rooms: RoomData[];
  onJoinRoom: (room: RoomData) => void;
}

export function RoomPanel({ rooms, onJoinRoom }: RoomPanelProps) {
  return (
    <div className="bg-[#fbfbfa] rounded-2xl border border-black/8 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
        <div className="flex items-center gap-2">
          <VideoIcon className="w-4 h-4 text-[#252724]" />
          <h3 className="text-sm font-bold tracking-tight text-[#252724]">
            Meeting Spaces & Hubs
          </h3>
        </div>
        <span className="text-[11px] text-[#252724]/60 font-mono">
          {rooms.length} Active Hubs
        </span>
      </div>

      <div className="space-y-2.5">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-3 rounded-xl bg-white border border-black/5 hover:border-black/15 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5a8357]" />
                <h4 className="text-xs font-semibold text-[#252724]">
                  {room.name}
                </h4>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#eef2ec] text-[#5a8357]">
                {room.roomType}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
              <div className="flex items-center gap-1.5 text-[11px] text-[#252724]/60">
                <UsersIcon className="w-3.5 h-3.5" />
                <span>
                  {room.occupantCount} / {room.capacity} participants
                </span>
              </div>
              <button
                onClick={() => onJoinRoom(room)}
                className="px-3 py-1 rounded-lg bg-[#252724] hover:bg-[#3b3e39] text-white text-[11px] font-medium transition-all"
              >
                Join Huddle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
