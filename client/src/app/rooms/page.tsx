'use client';

import React, { useState } from 'react';
import { Header } from '@/components/navigation/header';
import { ActiveHuddle } from '@/components/rooms/active_huddle';
import { VideoIcon, MicIcon, UsersIcon } from '@/components/icons/icons';
import { RoomData, UserProfile } from '@/types/office.types';

export default function RoomsPage() {
  const [currentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@acme.org',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
  });

  const [rooms, setRooms] = useState<RoomData[]>([
    {
      id: 'room-1',
      floorId: 'floor-2',
      name: 'Turing War Room',
      roomType: 'HUDDLE',
      capacity: 6,
      occupantCount: 2,
    },
    {
      id: 'room-2',
      floorId: 'floor-2',
      name: 'Lovelace Sync Hub',
      roomType: 'CONFERENCE',
      capacity: 12,
      occupantCount: 4,
    },
    {
      id: 'room-3',
      floorId: 'floor-2',
      name: 'Virtual Coffee Bar',
      roomType: 'WATERCOOLER',
      capacity: 20,
      occupantCount: 3,
    },
    {
      id: 'room-4',
      floorId: 'floor-3',
      name: 'Executive Strategy Pod',
      roomType: 'HUDDLE',
      capacity: 4,
      occupantCount: 1,
    },
  ]);

  const [activeRoom, setActiveRoom] = useState<RoomData | null>(null);

  const getRoomBadgeColor = (type: string) => {
    switch (type) {
      case 'HUDDLE':
        return 'bg-[#eef2ec] text-[#5a8357]';
      case 'CONFERENCE':
        return 'bg-blue-50 text-blue-700';
      case 'WATERCOOLER':
        return 'bg-amber-50 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <Header currentUser={currentUser} activePath="/rooms" />

      <section className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/8 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-black/8 gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#252724]">
              Meeting Spaces & Huddle Hubs
            </h2>
            <p className="text-xs text-[#252724]/70 mt-0.5">
              Decoupled Signaling Channels & Ephemeral Audio/Video Workspaces
            </p>
          </div>
          <button
            onClick={() => {
              const newRoom: RoomData = {
                id: `room-${Date.now()}`,
                floorId: 'floor-2',
                name: `Ad-Hoc Huddle ${rooms.length + 1}`,
                roomType: 'HUDDLE',
                capacity: 8,
                occupantCount: 1,
              };
              setRooms((prev) => [...prev, newRoom]);
              setActiveRoom(newRoom);
            }}
            className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Provision Instant Huddle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {rooms.map((room) => {
            const isFull = room.occupantCount >= room.capacity;
            return (
              <div
                key={room.id}
                className="p-5 rounded-xl border border-black/8 bg-[#fbfbfa] hover:border-black/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase ${getRoomBadgeColor(
                        room.roomType,
                      )}`}
                    >
                      {room.roomType}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#252724]/70">
                      <UsersIcon className="w-3.5 h-3.5" />
                      <span>{`${room.occupantCount} / ${room.capacity}`}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#252724]">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#252724]/60 mt-1">
                    Floor: {room.floorId.toUpperCase()} - WebRTC P2P / SFU Gateway
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-black/5">
                  <div className="flex items-center gap-2 text-xs text-[#252724]/60">
                    <span className="flex items-center gap-1">
                      <MicIcon className="w-3.5 h-3.5 text-[#5a8357]" />
                      Audio Ready
                    </span>
                    <span className="flex items-center gap-1">
                      <VideoIcon className="w-3.5 h-3.5 text-[#5a8357]" />
                      HD Video
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveRoom(room)}
                    disabled={isFull}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isFull
                        ? 'bg-black/5 text-black/30 cursor-not-allowed'
                        : 'bg-[#252724] hover:bg-[#3b3e39] text-white shadow-xs'
                    }`}
                  >
                    {isFull ? 'Room Full' : 'Join Huddle'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {activeRoom && (
        <ActiveHuddle
          room={activeRoom}
          currentUser={currentUser}
          onLeave={() => setActiveRoom(null)}
        />
      )}
    </main>
  );
}
