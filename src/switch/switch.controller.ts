import { Body, Post, Controller, Get, Request, Param } from '@nestjs/common';
import { CreateSwitchDto } from 'src/interfaces/switch.interface';
import { SwitchService } from './switch.service';

@Controller('switch')
export class SwitchController {
  constructor(private switchService: SwitchService) {}
  @Get()
  getAll(@Request() req) {
    return req.user;
  }

  @Post('register')
  createSwitch(@Body() createSwitchDto: CreateSwitchDto) {
    return this.switchService.createOne(createSwitchDto);
  }

  @Post(':id')
  assignSwitch(@Request() req, @Param() params: any) {
    const userId = req.user.user_id;
    const switchId = params.id;

    return this.switchService.assignOne(userId, switchId);
  }
}
