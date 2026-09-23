import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class JoinFloorDto {
  @IsString()
  @IsNotEmpty()
  floorId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsOptional()
  @IsString()
  deskId?: string;

  @IsOptional()
  @IsIn(['AVAILABLE', 'DEEP_WORK', 'IN_MEETING', 'AWAY'])
  status?: string;
}

export class SendKnockDto {
  @IsString()
  @IsNotEmpty()
  fromUserId: string;

  @IsString()
  @IsNotEmpty()
  toUserId: string;

  @IsOptional()
  @IsString()
  message?: string;
}

export class RespondKnockDto {
  @IsString()
  @IsNotEmpty()
  knockId: string;

  @IsString()
  @IsIn(['ACCEPTED', 'BUSY', 'LATER'])
  decision: string;
}
