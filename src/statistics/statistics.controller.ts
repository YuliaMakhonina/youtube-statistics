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

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post('register_channel')
  @Redirect('/statistics/:channelUuid')
  async registerChannel(@Body() channelData: ChannelDto) {
    const channelUuid = await this.statisticsService.registerChannel(
      channelData.channelId,
    );
    return { url: `/statistics/${channelUuid}` };
  }

  @Get('statistics/:channelUuid')
  async getStatistics(@Param('channelUuid') channelUuid: string): Promise<{
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  }> {
    const statistics = await this.statisticsService.getStatistics(channelUuid);
    return {
      viewCount: statistics.viewCount,
      videoCount: statistics.videoCount,
      subscriberCount: statistics.subscriberCount,
    };
  }

  // @Get()
  // @Render()
  // index() {
  //   return;
  // }

  @Post()
  async upsertChannel(@Body() channelData: ChannelDto) {
    await this.statisticsService.upsertChannel(channelData.channelId);
  }
}
