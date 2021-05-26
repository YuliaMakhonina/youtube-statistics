import { StatisticsDto } from './statistics.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChannelItemDto {
  @IsString()
  @IsNotEmpty()
  kind: string;

  @IsString()
  @IsNotEmpty()
  etag: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StatisticsDto)
  statistics: StatisticsDto
}