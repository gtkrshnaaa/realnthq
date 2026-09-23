import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ClaimDeskDto } from './dto/claim-desk.dto';

export interface DeskItem {
  id: string;
  floorId: string;
  deskLabel: string;
  posX: number;
  posY: number;
  deskType: string;
  currentOccupantId?: string;
  assignedUserId?: string;
}

@Injectable()
export class DesksService {
  constructor(private readonly db: DatabaseService) {}

  async getDesksByFloor(floorId: string): Promise<DeskItem[]> {
    if (this.db.connected) {
      const res = await this.db.query(
        'SELECT id, floor_id, desk_label, pos_x, pos_y, desk_type, current_occupant_id, assigned_user_id FROM desks WHERE floor_id = $1',
        [floorId],
      );
      return res.rows.map((r) => ({
        id: r.id,
        floorId: r.floor_id,
        deskLabel: r.desk_label,
        posX: r.pos_x,
        posY: r.pos_y,
        deskType: r.desk_type,
        currentOccupantId: r.current_occupant_id,
        assignedUserId: r.assigned_user_id,
      }));
    }

    // Default floor desks fallback
    return [
      {
        id: '10000000-0000-0000-0000-000000000001',
        floorId,
        deskLabel: 'ENG-01',
        posX: 4,
        posY: 4,
        deskType: 'DEDICATED',
        currentOccupantId: 'b0000000-0000-0000-0000-000000000001',
        assignedUserId: 'b0000000-0000-0000-0000-000000000001',
      },
      {
        id: '10000000-0000-0000-0000-000000000002',
        floorId,
        deskLabel: 'ENG-02',
        posX: 6,
        posY: 4,
        deskType: 'DEDICATED',
        currentOccupantId: 'b0000000-0000-0000-0000-000000000002',
        assignedUserId: 'b0000000-0000-0000-0000-000000000002',
      },
      {
        id: '10000000-0000-0000-0000-000000000003',
        floorId,
        deskLabel: 'HOT-01',
        posX: 4,
        posY: 8,
        deskType: 'HOT_DESK',
      },
      {
        id: '10000000-0000-0000-0000-000000000004',
        floorId,
        deskLabel: 'HOT-02',
        posX: 6,
        posY: 8,
        deskType: 'HOT_DESK',
      },
    ];
  }

  async claimDesk(dto: ClaimDeskDto) {
    if (this.db.connected) {
      await this.db.query(
        'UPDATE desks SET current_occupant_id = $1 WHERE id = $2',
        [dto.userId, dto.deskId],
      );
    }
    return {
      success: true,
      deskId: dto.deskId,
      userId: dto.userId,
    };
  }

  async releaseDesk(deskId: string) {
    if (this.db.connected) {
      await this.db.query(
        'UPDATE desks SET current_occupant_id = NULL WHERE id = $1',
        [deskId],
      );
    }
    return { success: true, deskId };
  }
}
