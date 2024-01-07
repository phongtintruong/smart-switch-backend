import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { historyProvider } from './history.provider';
import { DatabaseModule } from 'src/database/database.module';
import { HistoryController } from './history.controller';

@Module({
  providers: [HistoryService, ...historyProvider],
  imports: [DatabaseModule],
  exports: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
