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
      exclusive: false,
    });
    this.rmqChannel.sendToQueue(this.queue, Buffer.from(channelId), {
      persistent: true,
    });
    console.log(' [x] Sent %s', channelId);
    return this.channelExists(channelId);
  }

  async channelExists(channelId: string): Promise<string> {
    const uuid: {uuid: string} = await this.knex('channels')
      .first('uuid')
      .where('channel_id', channelId);
    return uuid.uuid;
  }

  async upsertChannel(channelId: string): Promise<string> {
    const existingChannelUuid = await this.channelExists(channelId);
    if (existingChannelUuid) {
      return existingChannelUuid;
    } else {
      return await this.registerChannel(channelId);
    }
  }

  async getStatistics(channelUuid: string): Promise<StatisticsDto[]> {
    const channelStatistics: StatisticsDto[] = await this.knex('channels_statistics')
      .select(
        'view_count as viewCount',
        'subscriber_count as subscriberCount',
        'hidden_subscriber_count as hiddenSubscriberCount',
        'video_count as videoCount',
        'date as date'
      )
      .where('uuid', channelUuid);
    return channelStatistics;
  }
}
