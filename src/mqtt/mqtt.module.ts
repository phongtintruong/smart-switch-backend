import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { SwitchModule } from 'src/switch/switch.module';

@Module({
  providers: [MqttService],
  exports: [MqttService],
  imports: [SwitchModule],
})
export class MqttModule {}
