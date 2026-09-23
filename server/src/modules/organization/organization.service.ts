import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface OrganizationDetails {
  id: string;
  name: string;
  slug: string;
  domain: string;
  settings: Record<string, any>;
  headquartersName: string;
  campusName: string;
  activeFloorsCount: number;
  activeDesksCount: number;
  activeMembersCount: number;
}

@Injectable()
export class OrganizationService {
  constructor(private readonly db: DatabaseService) {}

  async getCurrentOrganization(): Promise<OrganizationDetails> {
    if (this.db.connected) {
      const orgRes = await this.db.query(
        'SELECT id, name, slug, domain, settings FROM organizations LIMIT 1',
      );
      if (orgRes.rows.length > 0) {
        const org = orgRes.rows[0];

        const hqRes = await this.db.query(
          'SELECT name FROM headquarters WHERE organization_id = $1 LIMIT 1',
          [org.id],
        );
        const floorsRes = await this.db.query(
          'SELECT COUNT(*)::int as count FROM floors WHERE headquarters_id IN (SELECT id FROM headquarters WHERE organization_id = $1)',
          [org.id],
        );
        const desksRes = await this.db.query(
          'SELECT COUNT(*)::int as count FROM desks WHERE floor_id IN (SELECT id FROM floors WHERE headquarters_id IN (SELECT id FROM headquarters WHERE organization_id = $1))',
          [org.id],
        );
        const usersRes = await this.db.query(
          'SELECT COUNT(*)::int as count FROM users WHERE organization_id = $1',
          [org.id],
        );

        const hqName = hqRes.rows[0]?.name || 'RealntHQ Central Headquarters';

        return {
          id: org.id,
          name: org.name,
          slug: org.slug,
          domain: org.domain,
          settings: org.settings || {},
          headquartersName: hqName,
          campusName: hqName,
          activeFloorsCount: floorsRes.rows[0]?.count || 3,
          activeDesksCount: desksRes.rows[0]?.count || 5,
          activeMembersCount: usersRes.rows[0]?.count || 3,
        };
      }
    }

    // Default seeded fallback for decoupled development mode
    return {
      id: 'a0000000-0000-0000-0000-000000000001',
      name: 'RealntHQ Dev Squad',
      slug: 'realnthq-dev-squad',
      domain: 'squad.realnthq.local',
      settings: { max_floors: 10, media_topology: 'sfu' },
      headquartersName: 'RealntHQ Central Headquarters',
      campusName: 'RealntHQ Central Headquarters',
      activeFloorsCount: 3,
      activeDesksCount: 5,
      activeMembersCount: 3,
    };
  }
}
