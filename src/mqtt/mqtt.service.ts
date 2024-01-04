import { Injectable, OnModuleInit } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';
import { info } from 'ps-logger';

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient: MqttClient;
  onModuleInit() {
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl =
      'wss://b-67f65b7b-54b4-412b-916f-31c3d91ec962-2.mq.us-east-1.amazonaws.com:61619';
    this.mqttClient = connect(connectUrl, {
      clientId: clientId,
      clean: true,
      connectTimeout: 4000,
      username: 'smartswitch',
      password: 'smartswitch123',
      reconnectPeriod: 1000,
    });

    this.mqttClient.on('connect', function () {
      info('Connected to MQTT');
    });
    this.mqttClient.on('error', function (e) {
      info(e);
      info('Error in connecting to MQTT');
    });
  }

  publish(topic: string, payload: string): string {
    info(`Publishing to ${topic}`);
    this.mqttClient.publish(topic, payload);
    return `Publishing to ${topic}`;
  }
}
