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
}

export interface FloorInfo {
  id: string;
  floorNumber: number;
  name: string;
  activeOccupantsCount: number;
}

export interface DeskData {
  id: string;
  floorId: string;
  deskLabel: string;
  posX: number;
  posY: number;
  deskType: 'DEDICATED' | 'HOT_DESK';
  currentOccupant?: UserProfile;
  assignedUser?: UserProfile;
}

export interface RoomData {
  id: string;
  floorId: string;
  name: string;
  roomType: 'HUDDLE' | 'CONFERENCE' | 'WATERCOOLER' | 'WORKSHOP';
  capacity: number;
  occupantCount: number;
  activeMeetingId?: string;
}

export interface KnockNotification {
  knockId: string;
  fromUserId: string;
  fromUserName: string;
  message?: string;
  timestamp: number;
}
