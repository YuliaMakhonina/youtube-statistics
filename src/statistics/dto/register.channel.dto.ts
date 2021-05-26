import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterChannelDto {
  @IsNotEmpty()
  @IsString()
  channelId: string;
}