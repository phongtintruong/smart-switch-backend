import { Module } from '@nestjs/common';
import { SwitchService } from './switch.service';
import { DatabaseModule } from 'src/database/database.module';
import { switchProvider } from './switch.providers';

@Module({
  providers: [SwitchService, ...switchProvider],
  imports: [DatabaseModule],
  exports: [SwitchService],
})
export class SwitchModule {}
