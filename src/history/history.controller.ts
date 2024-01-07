import { Controller, Get, Request } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}
  @Get()
  getAll(@Request() req) {
    const user_id = req.user.user_id;
    return this.historyService.getAll(user_id);
  }
}
