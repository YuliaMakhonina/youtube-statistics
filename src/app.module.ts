import { Module } from '@nestjs/common';
import { LoggerErrorInterceptor } from './interceptors/logger.error.interceptor';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  providers: [LoggerErrorInterceptor],
  imports: [StatisticsModule],
})
export class AppModule {}
