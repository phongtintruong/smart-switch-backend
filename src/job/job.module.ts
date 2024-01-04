import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { jobProvider } from './job.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CronModule } from 'src/cron/cron.module';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  providers: [JobService, ...jobProvider],
  imports: [DatabaseModule, CronModule, MqttModule],
  exports: [JobService],
  controllers: [JobController],
})
export class JobModule {}
