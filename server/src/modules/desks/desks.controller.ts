import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DesksService } from './desks.service';
import { ClaimDeskDto } from './dto/claim-desk.dto';

@Controller('desks')
export class DesksController {
  constructor(private readonly desksService: DesksService) {}

  @Get('floor/:floorId')
  async getDesksByFloor(@Param('floorId') floorId: string) {
    return this.desksService.getDesksByFloor(floorId);
  }

  @Post('claim')
  async claimDesk(@Body() dto: ClaimDeskDto) {
    return this.desksService.claimDesk(dto);
  }

  @Post(':id/release')
  async releaseDesk(@Param('id') id: string) {
    return this.desksService.releaseDesk(id);
  }
}
