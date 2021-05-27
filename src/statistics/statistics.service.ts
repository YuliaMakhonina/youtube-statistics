import { Inject, Injectable } from '@nestjs/common';
import { StatisticsDto } from './dto/statistics.dto';
import { Knex } from 'knex';
import * as rmq from 'amqplib';

@Injectable()
export class StatisticsService {
  private readonly queue = 'channels_statistics';
  constructor(
    @Inject('knex') private readonly knex: Knex,
    @Inject('rmq') private readonly rmqChannel: rmq.Channel,
  ) {}
  async registerChannel(channelId: string): Promise<string> {
    const existingChannelId = await this.channelExists(channelId);
    if (existingChannelId) {
      return existingChannelId;
    }
    await this.knex('channels').insert({ channel_id: channelId });
    await this.rmqChannel.assertQueue(this.queue, {
      durable: true,
    });
    this.rmqChannel.sendToQueue(this.queue, Buffer.from(channelId), {
      persistent: true,
    });
    console.log(' [x] Sent %s', channelId);
    return this.channelExists(channelId);
  }

  async channelExists(channelId: string): Promise<string> {
    return await this.knex('channels')
      .first('uuid')
      .where('channel_id', channelId);
  }

  async upsertChannel(channelId: string) {
    const existingChannelUuid = await this.channelExists(channelId);
    if (existingChannelUuid) {
      await this.getStatistics(existingChannelUuid);
      return;
    } else {
      const registeredChannelUuid = await this.registerChannel(channelId);
      await this.getStatistics(registeredChannelUuid);
      return;
    }
  }

  async getStatistics(channelUuid: string): Promise<StatisticsDto[]> {
    const channelStatistics: StatisticsDto[] = await this.knex('statistics')
      .select(
        'view_count as viewCount',
        'subscriber_count as subscriberCount',
        'hidden_subscriber_count as hiddenSubscriberCount',
        'video_count as videoCount',
      )
      .where('uuid', channelUuid);
    return channelStatistics;
    // const channelStatistics: { items: ChannelItemDto[] } = await got(
    //   'https://www.googleapis.com/youtube/v3/channels',
    //   {
    //     searchParams: {
    //       part: 'statistics',
    //       id: channelID,
    //       key: config.get('app.apiKey'),
    //     },
    //   },
    // ).json();
    // console.log(channelStatistics);
    // if (channelStatistics.items && channelStatistics.items.length > 0) {
    //   return channelStatistics.items[0].statistics;
    // }
    // throw new HttpException(
    //   {
    //     code: 404,
    //     description:
    //       'Unfortunately channel statistics could not be found :(. \n' +
    //       'Please, try some other channelID or enter correctly current channelID.',
    //   },
    //   HttpStatus.NOT_FOUND,
    // );
  }
}
