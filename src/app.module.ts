import { Module } from '@nestjs/common';
import { StatisticsModule } from './statistics/statistics.module';
import { LoggerErrorInterceptor } from './interceptors/logger.error.interceptor';

@Module({
  providers: [LoggerErrorInterceptor],
  imports: [StatisticsModule],
})
export class AppModule {}
