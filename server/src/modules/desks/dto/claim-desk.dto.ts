import { IsString, IsNotEmpty } from 'class-validator';

export class ClaimDeskDto {
  @IsString()
  @IsNotEmpty()
  deskId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
