import * as rmq from 'amqplib';
import * as config from 'config';
import { Module } from '@nestjs/common';

const rmqFactory = {
  provide: 'rmq',
  useFactory: async () => {
    const connection = await rmq.connect(`amqp://${config.get('rmq.host')}`);
    return await connection.createChannel();
  },
};
@Module({
  providers: [rmqFactory],
  exports: [rmqFactory],
})
export class RmqModule {}
