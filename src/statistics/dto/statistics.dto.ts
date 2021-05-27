import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class StatisticsDto {
  @IsString()
  @IsNotEmpty()
  viewCount: string;

  @IsString()
  @IsNotEmpty()
  subscriberCount: string;

  @IsBoolean()
  @IsNotEmpty()
  hiddenSubscriberCount: boolean;

  @IsString()
  @IsNotEmpty()
  videoCount: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}