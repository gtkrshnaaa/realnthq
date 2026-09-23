import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateRoomDto } from './dto/create-room.dto';

export interface RoomItem {
  id: string;
  floorId: string;
  name: string;
  roomType: string;
  capacity: number;
  occupantCount: number;
}

@Injectable()
export class RoomsService {
  constructor(private readonly db: DatabaseService) {}

  async getRoomsByFloor(floorId: string): Promise<RoomItem[]> {
    if (this.db.connected) {
      const res = await this.db.query(
        'SELECT id, floor_id, name, room_type, capacity FROM rooms WHERE floor_id = $1 ORDER BY name ASC',
        [floorId],
      );
      return res.rows.map((r) => ({
        id: r.id,
        floorId: r.floor_id,
        name: r.name,
        roomType: r.room_type,
        capacity: r.capacity,
        occupantCount: 0,
      }));
    }

    // Default static floor rooms fallback
    return [
      {
        id: 'f0000000-0000-0000-0000-000000000001',
        floorId,
        name: 'Turing War Room',
        roomType: 'HUDDLE',
        capacity: 6,
        occupantCount: 2,
      },
      {
        id: 'f0000000-0000-0000-0000-000000000002',
        floorId,
        name: 'Lovelace Sync Hub',
        roomType: 'CONFERENCE',
        capacity: 12,
        occupantCount: 0,
      },
      {
        id: 'f0000000-0000-0000-0000-000000000003',
        floorId,
        name: 'Virtual Coffee Bar',
        roomType: 'WATERCOOLER',
        capacity: 20,
        occupantCount: 3,
      },
    ];
  }

  async createRoom(dto: CreateRoomDto): Promise<RoomItem> {
    const id = `room_${Date.now()}`;
    if (this.db.connected) {
      const res = await this.db.query(
        'INSERT INTO rooms (floor_id, name, room_type, capacity) VALUES ($1, $2, $3, $4) RETURNING id, floor_id, name, room_type, capacity',
        [dto.floorId, dto.name, dto.roomType, dto.capacity || 8],
      );
      const r = res.rows[0];
      return {
        id: r.id,
        floorId: r.floor_id,
        name: r.name,
        roomType: r.room_type,
        capacity: r.capacity,
        occupantCount: 0,
      };
    }

    return {
      id,
      floorId: dto.floorId,
      name: dto.name,
      roomType: dto.roomType,
      capacity: dto.capacity || 8,
      occupantCount: 0,
    };
  }
}
