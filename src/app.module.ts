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

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, SwitchModule],
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
