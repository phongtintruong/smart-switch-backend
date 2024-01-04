import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SwitchController } from './switch/switch.controller';
import { SwitchModule } from './switch/switch.module';
import { JobModule } from './job/job.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    SwitchModule,
    JobModule,
    ScheduleModule.forRoot(),
    CronModule,
    MqttModule,
  ],
  controllers: [AppController, SwitchController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
