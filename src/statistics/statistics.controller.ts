import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { RegisterChannelDto } from './dto/register.channel.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly appService: StatisticsService) {}

  @Post()
  async registerChannel(@Body() channelData: RegisterChannelDto): Promise<{ result: string }> {
    return { result: "OK" }
  }

  @Get('subscriptions')
  async getSubscriptions(@Query("channelID") channelID: string): Promise<{viewCount: string, subscriberCount: string, videoCount: string }> {
    const statistics = await this.appService.getSubscriptions(channelID);
    return {
      viewCount: statistics.viewCount,
      videoCount:statistics.videoCount,
      subscriberCount: statistics.subscriberCount
    }
  }
}
