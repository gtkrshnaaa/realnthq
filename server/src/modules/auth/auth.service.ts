import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto';

export interface AuthSession {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    organizationId: string;
  };
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async login(dto: LoginDto): Promise<AuthSession> {
    if (this.db.connected) {
      const res = await this.db.query(
        'SELECT id, email, full_name, role, organization_id FROM users WHERE email = $1 LIMIT 1',
        [dto.email],
      );
      if (res.rows.length > 0) {
        const u = res.rows[0];
        return {
          user: {
            id: u.id,
            email: u.email,
            fullName: u.full_name,
            role: u.role,
            organizationId: u.organization_id,
          },
          accessToken: `token_${u.id}_${Date.now()}`,
        };
      }
    }

    // Default development credential matching seed admin
    if (dto.email === 'admin@acme.org' && dto.password === 'password123') {
      return {
        user: {
          id: 'b0000000-0000-0000-0000-000000000001',
          email: 'admin@acme.org',
          fullName: 'Alex Vance',
          role: 'ADMIN',
          organizationId: 'a0000000-0000-0000-0000-000000000001',
        },
        accessToken: `token_dev_${Date.now()}`,
      };
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}
