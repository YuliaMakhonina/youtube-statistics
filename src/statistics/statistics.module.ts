import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { RmqModule } from '../rmq/rmq.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [KnexModule, RmqModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
