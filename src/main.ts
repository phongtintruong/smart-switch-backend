import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.MQTT,
  //   options: {
  //     // Move this to a .env pls :))
  //     url: 'mqtt+ssl://b-67f65b7b-54b4-412b-916f-31c3d91ec962-1.mq.us-east-1.amazonaws.com:8883',
  //     username: 'smartswitch',
  //     password: 'smartswitch123',
  //   },
  // });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
