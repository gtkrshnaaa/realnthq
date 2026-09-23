import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('floor/:floorId')
  async getRoomsByFloor(@Param('floorId') floorId: string) {
    return this.roomsService.getRoomsByFloor(floorId);
  }

  @Post()
  async createRoom(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }
}
