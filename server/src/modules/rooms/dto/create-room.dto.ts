import { IsString, IsNotEmpty, IsInt, Min, Max, IsIn, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  floorId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['HUDDLE', 'CONFERENCE', 'WATERCOOLER', 'WORKSHOP'])
  roomType: string;

  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(50)
  capacity?: number;
}
