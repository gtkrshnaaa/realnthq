'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { FloorSelector } from '@/components/office/floor_selector';
import { OfficeGrid } from '@/components/office/office_grid';
import { PresenceRadar } from '@/components/presence/presence_radar';
import { KnockModal } from '@/components/presence/knock_modal';
import { RoomPanel } from '@/components/rooms/room_panel';
import { ActiveHuddle } from '@/components/rooms/active_huddle';
import { FocusModeModal } from '@/components/focus/focus_mode_modal';
import { BufferedKnockDrawer } from '@/components/focus/buffered_knock_drawer';
import { StandupKioskModal } from '@/components/standup/standup_kiosk_modal';
import { DeskNoteModal } from '@/components/office/desk_note_modal';
import { GuestInviteModal } from '@/components/guests/guest_invite_modal';
import {
  UserProfile,
  FloorInfo,
  DeskData,
  RoomData,
  UserPresenceStatus,
  KnockNotification,
  BufferedKnock,
  StandupEntry,
  GuestPass,
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

  // Feature States
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [bufferedKnocks, setBufferedKnocks] = useState<BufferedKnock[]>([
    {
      knockId: 'bk-sample-1',
      fromUserId: 'user-3',
      fromUserName: 'Kenji Sato',
      message: 'Quick sync on spatial partitioning latency when you emerge from deep work?',
      timestamp: Date.now() - 1000 * 60 * 12,
      bufferedUntil: 'Session End',
    },
  ]);

  const [isStandupOpen, setIsStandupOpen] = useState(false);
  const [standupEntries, setStandupEntries] = useState<StandupEntry[]>([
    {
      id: 'standup-1',
      userId: 'user-2',
      userName: 'Sarah Connor',
      displayTitle: 'Staff Product Designer',
      yesterday: 'Finalized mobile viewport grid and token palette for Warm Editorial Light',
      today: 'Designing deep-work pod spatial canvas and desk sticky notes',
      timestamp: 'Today, 08:45 AM',
    },
    {
      id: 'standup-2',
      userId: 'user-3',
      userName: 'Kenji Sato',
      displayTitle: 'Distributed Systems Lead',
      yesterday: 'Benchmarked spatial presence quadtree bounds under 5,000 virtual avatars',
      today: 'Investigating WebRTC audio attenuation in watercooler lounge',
      timestamp: 'Today, 09:15 AM',
    },
  ]);

  const [selectedNoteDesk, setSelectedNoteDesk] = useState<DeskData | null>(null);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestPasses, setGuestPasses] = useState<GuestPass[]>([
    {
      id: 'guest-1',
      guestName: 'Elena Rostova (Compliance Auditor)',
      hostUserId: currentUser.id,
      hostUserName: currentUser.fullName,
      accessCode: 'REALNT-GUEST-9481',
      targetRoomName: 'Turing War Room',
      status: 'WAITING_LOBBY',
      createdAt: '10 mins ago',
    },
  ]);

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

  const handleStartFocus = (durationMinutes: number, goal: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      status: 'DEEP_WORK',
      statusMessage: goal,
      focusRemainingMinutes: durationMinutes,
    }));
    setDesks((prev) =>
      prev.map((d) =>
        d.currentOccupant?.id === currentUser.id
          ? {
              ...d,
              currentOccupant: {
                ...d.currentOccupant,
                status: 'DEEP_WORK',
                focusRemainingMinutes: durationMinutes,
              },
            }
          : d,
      ),
    );
    setIsFocusModalOpen(false);
  };

  const handleEndFocus = () => {
    setCurrentUser((prev) => ({
      ...prev,
      status: 'AVAILABLE',
      focusRemainingMinutes: undefined,
    }));
    setDesks((prev) =>
      prev.map((d) =>
        d.currentOccupant?.id === currentUser.id
          ? {
              ...d,
              currentOccupant: {
                ...d.currentOccupant,
                status: 'AVAILABLE',
                focusRemainingMinutes: undefined,
              },
            }
          : d,
      ),
    );
    setIsFocusModalOpen(false);
    if (bufferedKnocks.length > 0) {
      setIsTrayOpen(true);
    }
  };

  const handleSaveDeskNote = (noteText: string) => {
    if (!selectedNoteDesk) return;
    setDesks((prev) =>
      prev.map((d) => (d.id === selectedNoteDesk.id ? { ...d, stickyNote: noteText } : d)),
    );
  };

  const handleClearDeskNote = () => {
    if (!selectedNoteDesk) return;
    setDesks((prev) =>
      prev.map((d) => (d.id === selectedNoteDesk.id ? { ...d, stickyNote: undefined } : d)),
    );
  };

  const handleAddStandup = (entry: Omit<StandupEntry, 'id' | 'timestamp'>) => {
    const newEntry: StandupEntry = {
      ...entry,
      id: `standup-${Date.now()}`,
      timestamp: 'Just now',
    };
    setStandupEntries((prev) => [newEntry, ...prev]);
  };

  const handleCreateGuestPass = (guestName: string, targetRoomName: string) => {
    const newPass: GuestPass = {
      id: `guest-${Date.now()}`,
      guestName,
      hostUserId: currentUser.id,
      hostUserName: currentUser.fullName,
      accessCode: `REALNT-GUEST-${Math.floor(1000 + Math.random() * 9000)}`,
      targetRoomName,
      status: 'WAITING_LOBBY',
      createdAt: 'Just now',
    };
    setGuestPasses((prev) => [newPass, ...prev]);
  };

  const handleEscortGuest = (guestId: string) => {
    setGuestPasses((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, status: 'IN_SESSION' } : g)),
    );
  };

  const handleSendKnock = (targetId: string, message: string) => {
    if (targetKnockUser?.status === 'DEEP_WORK') {
      const buffered: BufferedKnock = {
        knockId: `bk-${Date.now()}`,
        fromUserId: currentUser.id,
        fromUserName: currentUser.fullName,
        message,
        timestamp: Date.now(),
        bufferedUntil: 'Session End',
      };
      setBufferedKnocks((prev) => [...prev, buffered]);
    }
    setTargetKnockUser(null);
  };

  return (
    <DashboardLayout
      activePath="/office"
      title="Virtual Office Grid"
      subtitle="Interactive 2D spatial canvas with real-time desk assignment"
      badge="Live Spatial Session"
      currentUser={currentUser}
      onUpdateStatus={handleUpdateStatus}
      actions={
        <div className="flex items-center gap-2">
          {currentUser.status === 'DEEP_WORK' ? (
            <button
              onClick={() => setIsFocusModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8c5e31] text-white text-xs font-semibold hover:opacity-90 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Flow Active ({currentUser.focusRemainingMinutes ?? 25}m)</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef2ec] text-[#5a8357] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#5a8357] animate-pulse" />
              <span>Connected (Low-Latency)</span>
            </span>
          )}

          <button
            onClick={() => setIsTrayOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-white border border-black/10 hover:border-black/25 text-xs font-semibold text-[#252724] transition-all shadow-2xs flex items-center gap-1"
          >
            <span>Desk Tray</span>
            {bufferedKnocks.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#8c5e31] text-white text-[10px] font-mono">
                {bufferedKnocks.length}
              </span>
            )}
          </button>
        </div>
      }
    >
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
            onOpenNote={(desk) => setSelectedNoteDesk(desk)}
            onOpenStandupKiosk={() => setIsStandupOpen(true)}
            onOpenFocusModal={() => setIsFocusModalOpen(true)}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            standupCount={standupEntries.length}
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
          onSendKnock={handleSendKnock}
          onRespondKnock={(knockId, decision) => {
            setIncomingKnock(null);
          }}
        />
      )}

      <FocusModeModal
        isOpen={isFocusModalOpen}
        currentRemainingMinutes={currentUser.focusRemainingMinutes}
        currentGoal={currentUser.statusMessage}
        onClose={() => setIsFocusModalOpen(false)}
        onStartFocus={handleStartFocus}
        onEndFocus={handleEndFocus}
      />

      <BufferedKnockDrawer
        isOpen={isTrayOpen}
        knocks={bufferedKnocks}
        onClose={() => setIsTrayOpen(false)}
        onClearKnock={(id) => setBufferedKnocks((prev) => prev.filter((k) => k.knockId !== id))}
        onReplyKnock={(k) => {
          // Trigger quick reply or connect
        }}
      />

      <StandupKioskModal
        isOpen={isStandupOpen}
        entries={standupEntries}
        currentUserId={currentUser.id}
        currentUserName={currentUser.fullName}
        currentUserTitle={currentUser.displayTitle}
        onClose={() => setIsStandupOpen(false)}
        onSubmitCheckin={handleAddStandup}
      />

      {selectedNoteDesk && (
        <DeskNoteModal
          isOpen={!!selectedNoteDesk}
          deskLabel={selectedNoteDesk.deskLabel}
          initialNote={selectedNoteDesk.stickyNote}
          onClose={() => setSelectedNoteDesk(null)}
          onSaveNote={handleSaveDeskNote}
          onClearNote={handleClearDeskNote}
        />
      )}

      <GuestInviteModal
        isOpen={isGuestModalOpen}
        guests={guestPasses}
        availableRooms={rooms.map((r) => r.name)}
        onClose={() => setIsGuestModalOpen(false)}
        onCreatePass={handleCreateGuestPass}
        onEscortGuest={handleEscortGuest}
      />
    </DashboardLayout>
  );
}
