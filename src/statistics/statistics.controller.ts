import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  Redirect,
  Param,
  Render,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ChannelDto } from './dto/channel.dto';
import { Response } from 'express';
import { StatisticsDto } from './dto/statistics.dto';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Post()
  @Redirect('statistics/:channelUuid')
  async upsertChannel(@Body() channelData: ChannelDto) {
    const channelUuid = await this.statisticsService.upsertChannel(channelData.channelId);
    console.log(channelUuid);
    return {url: `statistics/${channelUuid}`}
  }

  @Get()
  hello() {
    return {server_status: "OK"}
  }
  @Get('statistics/:channelUuid')
  async getStatistics(@Param('channelUuid') channelUuid: string) {
    console.log(channelUuid);
    const statistics: StatisticsDto[] = await this.statisticsService.getStatistics(channelUuid);
    console.log(statistics);
    return statistics;
  }
}
