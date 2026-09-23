import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PresenceModule } from './modules/presence/presence.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { DesksModule } from './modules/desks/desks.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [
    DatabaseModule,
    HealthModule,
    AuthModule,
    PresenceModule,
    RoomsModule,
    DesksModule,
    OrganizationModule,
  ],
})
export class AppModule {}
