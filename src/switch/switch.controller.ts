import { Body, Post, Controller, Get, Request, Param } from '@nestjs/common';
import { CreateSwitchDto } from 'src/interfaces/switch.interface';
import { SwitchService } from './switch.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('switch')
export class SwitchController {
  constructor(private switchService: SwitchService) {}
  @Get()
  getAll(@Request() req) {
    const userId = req.user.user_id;

    return this.switchService.getAll(userId);
  }

  @Post('register')
  @Public()
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
