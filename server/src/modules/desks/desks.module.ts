import { Module } from '@nestjs/common';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';

@Module({
  controllers: [DesksController],
  providers: [DesksService],
  exports: [DesksService],
})
export class DesksModule {}
