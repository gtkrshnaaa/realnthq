'use client';

import React, { useState } from 'react';
import { Header } from '@/components/navigation/header';
import { FloorSelector } from '@/components/office/floor_selector';
import { OfficeGrid } from '@/components/office/office_grid';
import { PresenceRadar } from '@/components/presence/presence_radar';
import { KnockModal } from '@/components/presence/knock_modal';
import { RoomPanel } from '@/components/rooms/room_panel';
import { ActiveHuddle } from '@/components/rooms/active_huddle';
import {
  UserProfile,
  FloorInfo,
  DeskData,
  RoomData,
  UserPresenceStatus,
  KnockNotification,
} from '@/types/office.types';

export default function OfficePage() {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@squad.realnthq.local',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
    statusMessage: 'Reviewing PRs and architecture',
    floorId: 'floor-2',
    deskId: 'desk-1',
  });

  const [floors] = useState<FloorInfo[]>([
    { id: 'floor-1', floorNumber: 1, name: 'Lobby & Community Commons', activeOccupantsCount: 4 },
    { id: 'floor-2', floorNumber: 2, name: 'Engineering & Product Floor', activeOccupantsCount: 12 },
    { id: 'floor-3', floorNumber: 3, name: 'Executive & Focus Library', activeOccupantsCount: 6 },
  ]);

  const [activeFloorId, setActiveFloorId] = useState('floor-2');

  const [desks, setDesks] = useState<DeskData[]>([
    {
      id: 'desk-1',
      floorId: 'floor-2',
      deskLabel: 'ENG-01',
      posX: 4,
      posY: 4,
      deskType: 'DEDICATED',
      currentOccupant: currentUser,
    },
    {
      id: 'desk-2',
      floorId: 'floor-2',
      deskLabel: 'ENG-02',
      posX: 6,
      posY: 4,
      deskType: 'DEDICATED',
      currentOccupant: {
        id: 'user-2',
        email: 'sarah@squad.realnthq.local',
        fullName: 'Sarah Connor',
        displayTitle: 'Staff Product Designer',
        status: 'DEEP_WORK',
      },
    },
    {
      id: 'desk-3',
      floorId: 'floor-2',
      deskLabel: 'ENG-03',
      posX: 8,
      posY: 4,
      deskType: 'DEDICATED',
      currentOccupant: {
        id: 'user-3',
        email: 'kenji@squad.realnthq.local',
        fullName: 'Kenji Sato',
        displayTitle: 'Distributed Systems Lead',
        status: 'AVAILABLE',
      },
    },
    {
      id: 'desk-4',
      floorId: 'floor-2',
      deskLabel: 'HOT-01',
      posX: 4,
      posY: 8,
      deskType: 'HOT_DESK',
    },
    {
      id: 'desk-5',
      floorId: 'floor-2',
      deskLabel: 'HOT-02',
      posX: 6,
      posY: 8,
      deskType: 'HOT_DESK',
    },
    {
      id: 'desk-6',
      floorId: 'floor-2',
      deskLabel: 'HOT-03',
      posX: 8,
      posY: 8,
      deskType: 'HOT_DESK',
    },
  ]);

  const [rooms] = useState<RoomData[]>([
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
      occupantCount: 0,
    },
    {
      id: 'room-3',
      floorId: 'floor-2',
      name: 'Virtual Coffee Bar',
      roomType: 'WATERCOOLER',
      capacity: 20,
      occupantCount: 3,
    },
  ]);

  const [activeHuddleRoom, setActiveHuddleRoom] = useState<RoomData | null>(null);
  const [targetKnockUser, setTargetKnockUser] = useState<UserProfile | null>(null);
  const [incomingKnock, setIncomingKnock] = useState<KnockNotification | null>(null);

  const handleClaimDesk = (deskId: string) => {
    setDesks((prev) =>
      prev.map((d) => {
        if (d.id === deskId) return { ...d, currentOccupant: currentUser };
        if (d.currentOccupant?.id === currentUser.id) return { ...d, currentOccupant: undefined };
        return d;
      }),
    );
    setCurrentUser((prev) => ({ ...prev, deskId }));
  };

  const handleReleaseDesk = (deskId: string) => {
    setDesks((prev) =>
      prev.map((d) => (d.id === deskId ? { ...d, currentOccupant: undefined } : d)),
    );
    setCurrentUser((prev) => ({ ...prev, deskId: undefined }));
  };

  const handleUpdateStatus = (status: UserPresenceStatus, message?: string) => {
    setCurrentUser((prev) => ({ ...prev, status, statusMessage: message }));
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <Header
        currentUser={currentUser}
        activePath="/office"
        onUpdateStatus={handleUpdateStatus}
      />

      <section>
        <FloorSelector
          floors={floors}
          activeFloorId={activeFloorId}
          onSelectFloor={setActiveFloorId}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OfficeGrid
            floorName="Engineering & Product Floor (Level 2)"
            desks={desks}
            currentUser={currentUser}
            onClaimDesk={handleClaimDesk}
            onReleaseDesk={handleReleaseDesk}
            onKnockUser={setTargetKnockUser}
          />
        </div>

        <div className="space-y-6">
          <PresenceRadar
            occupants={[
              currentUser,
              desks[1].currentOccupant!,
              desks[2].currentOccupant!,
            ]}
            currentUserId={currentUser.id}
            onKnockUser={setTargetKnockUser}
          />

          <RoomPanel
            rooms={rooms}
            onJoinRoom={(room) => setActiveHuddleRoom(room)}
          />
        </div>
      </section>

      {activeHuddleRoom && (
        <ActiveHuddle
          room={activeHuddleRoom}
          currentUser={currentUser}
          onLeave={() => setActiveHuddleRoom(null)}
        />
      )}

      {(targetKnockUser || incomingKnock) && (
        <KnockModal
          targetUser={targetKnockUser}
          incomingKnock={incomingKnock}
          onClose={() => {
            setTargetKnockUser(null);
            setIncomingKnock(null);
          }}
          onSendKnock={(targetId, msg) => {
            // Emits knock event
          }}
          onRespondKnock={(knockId, decision) => {
            setIncomingKnock(null);
          }}
        />
      )}
    </main>
  );
}
