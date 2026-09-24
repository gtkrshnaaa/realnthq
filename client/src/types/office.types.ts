export type UserPresenceStatus = 'AVAILABLE' | 'DEEP_WORK' | 'IN_MEETING' | 'AWAY' | 'OFFLINE';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  displayTitle: string;
  status: UserPresenceStatus;
  statusMessage?: string;
  deskId?: string;
  floorId?: string;
  focusRemainingMinutes?: number;
}

export type CampusWing = 'WEST' | 'CENTRAL' | 'EAST' | 'SOUTH';

export interface FloorInfo {
  id: string;
  floorNumber: number;
  name: string;
  activeOccupantsCount: number;
  departmentCode?: string;
  elevationCode?: string;
  description?: string;
}

export interface DeskData {
  id: string;
  floorId: string;
  deskLabel: string;
  posX: number;
  posY: number;
  deskType: 'DEDICATED' | 'HOT_DESK';
  wing?: CampusWing;
  currentOccupant?: UserProfile;
  assignedUser?: UserProfile;
  stickyNote?: string;
  customBadge?: string;
  isFocusPod?: boolean;
}

export interface RoomData {
  id: string;
  floorId: string;
  name: string;
  roomType: 'HUDDLE' | 'CONFERENCE' | 'WATERCOOLER' | 'WORKSHOP';
  capacity: number;
  occupantCount: number;
  wing?: CampusWing;
  activeMeetingId?: string;
}

export interface KnockNotification {
  knockId: string;
  fromUserId: string;
  fromUserName: string;
  message?: string;
  timestamp: number;
}

export interface BufferedKnock extends KnockNotification {
  bufferedUntil: string;
  isRead?: boolean;
}

export interface StandupEntry {
  id: string;
  userId: string;
  userName: string;
  displayTitle: string;
  yesterday: string;
  today: string;
  blockers?: string;
  timestamp: string;
}

export interface GuestPass {
  id: string;
  guestName: string;
  hostUserId: string;
  hostUserName: string;
  accessCode: string;
  targetRoomName: string;
  status: 'WAITING_LOBBY' | 'IN_SESSION' | 'COMPLETED';
  createdAt: string;
}

export interface WhiteboardNote {
  id: string;
  roomId: string;
  title: string;
  content: string;
  authorName: string;
  updatedAt: string;
}
