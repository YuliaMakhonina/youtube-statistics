import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import got from 'got';
import * as config from 'config';
import { ChannelItemDto } from './dto/channel.item.dto';
import { StatisticsDto } from './dto/statistics.dto';

@Injectable()
export class StatisticsService {
  async

  async getSubscriptions(channelID: string): Promise<StatisticsDto> {
    const channelStatistics: {items: ChannelItemDto[]} = await got('https://www.googleapis.com/youtube/v3/channels', {
      searchParams: {
        part: 'statistics',
        id: channelID,
        key: config.get('app.apiKey'),
      },
    }).json();
    console.log(channelStatistics);
      if (channelStatistics.items && channelStatistics.items.length > 0) {
          return channelStatistics.items[0].statistics;
      }
    throw new HttpException({code: 404, description: 'Unfortunately channel statistics could not be found :(. \n' +
        'Please, try some other channelID or enter correctly current channelID.'}, HttpStatus.NOT_FOUND)
  }
}
