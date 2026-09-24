import { UserProfile } from './office.types';

export type AppRouteSection =
  | '/office'
  | '/rooms'
  | '/broadcasts'
  | '/standup'
  | '/team'
  | '/artifacts';

export type OperationalTier = 1 | 2 | 3 | 4 | 5;

export type DepartmentCluster =
  | 'ALL'
  | 'ENGINEERING'
  | 'PRODUCT_DESIGN'
  | 'REVENUE'
  | 'PEOPLE_OPS'
  | 'LEADERSHIP';

export interface SemanticLocation {
  route: AppRouteSection;
  subContextId?: string;
  subContextName: string;
  tier: OperationalTier;
  activityLabel: string;
}

export interface SemanticUserPresence {
  user: UserProfile;
  department: DepartmentCluster;
  location: SemanticLocation;
  isMicActive?: boolean;
  isScreenSharing?: boolean;
}

export interface SectorSummary {
  id: string;
  route: AppRouteSection;
  label: string;
  category: string;
  description: string;
  tier: OperationalTier;
  tierName: string;
  activeCount: number;
  capacity?: number;
  occupants: SemanticUserPresence[];
  subContexts: Array<{
    id: string;
    name: string;
    activeCount: number;
  }>;
}

export interface SemanticHqOverview {
  totalActiveUsers: number;
  sectors: SectorSummary[];
  tierDistribution: Record<OperationalTier, number>;
}
