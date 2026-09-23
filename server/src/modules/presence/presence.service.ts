import { Injectable, Logger } from '@nestjs/common';

export interface OfficeOccupant {
  userId: string;
  userName: string;
  floorId: string;
  deskId?: string;
  status: string;
  socketId: string;
  lastHeartbeat: number;
}

@Injectable()
export class PresenceService {
  private readonly logger = new Logger(PresenceService.name);
  private occupants = new Map<string, OfficeOccupant>();

  setOccupant(socketId: string, occupant: OfficeOccupant) {
    this.occupants.set(socketId, occupant);
  }

  getOccupant(socketId: string): OfficeOccupant | undefined {
    return this.occupants.get(socketId);
  }

  removeOccupant(socketId: string): OfficeOccupant | undefined {
    const occ = this.occupants.get(socketId);
    if (occ) {
      this.occupants.delete(socketId);
    }
    return occ;
  }

  getFloorOccupants(floorId: string): OfficeOccupant[] {
    const list: OfficeOccupant[] = [];
    for (const occ of this.occupants.values()) {
      if (occ.floorId === floorId) {
        list.push(occ);
      }
    }
    return list;
  }

  updateHeartbeat(socketId: string): boolean {
    const occ = this.occupants.get(socketId);
    if (occ) {
      occ.lastHeartbeat = Date.now();
      return true;
    }
    return false;
  }
}
