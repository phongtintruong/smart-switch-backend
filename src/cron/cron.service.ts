import { Injectable } from '@nestjs/common';

@Injectable()
export class CronService {
  genCronKey(period: string, period_time: Date) {
    let cronKey = '';
    switch (period) {
      case 'SECOND':
        cronKey = `* * * * * *`;
        break;
      case 'MINUTE':
        cronKey = `${period_time.getSeconds()} * * * * *`;
        break;
      case 'HOUR':
        cronKey = `${period_time.getSeconds()} ${period_time.getMinutes()} * * * *`;
        break;
      case 'DAY':
        cronKey = `${period_time.getSeconds()} ${period_time.getMinutes()} ${period_time.getHours()} * * *`;
        break;
      case 'MONTH':
        cronKey = `${period_time.getSeconds()} ${period_time.getMinutes()} ${period_time.getHours()} ${period_time.getDate()} * *`;
        break;
      case 'YEAR':
        cronKey = `${period_time.getSeconds()} ${period_time.getMinutes()} ${period_time.getHours()} ${period_time.getDate()} ${period_time.getMonth()} *`;
        break;
    }
    return cronKey;
  }

  getCronTimeout(period_time: Date) {
    const now_time = new Date();
    console.log(now_time);
    console.log(period_time);
    return period_time.getTime() - now_time.getTime();
  }
}
