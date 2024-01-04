/* eslint-disable @typescript-eslint/ban-types */
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { time } from 'console';
import { CronJob } from 'cron';
import { Document, Model, Types } from 'mongoose';
import { CronService } from 'src/cron/cron.service';
import { JOB_TYPE } from 'src/interfaces/constants';
import { CreateJobDto, DeleteJobDto, Job } from 'src/interfaces/job.interface';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_MODEL')
    private jobModel: Model<Job>,

    private schedulerRegistry: SchedulerRegistry,
    private cronService: CronService,
    private mqttService: MqttService,
  ) {}

  private readonly logger = new Logger(JobService.name);

  async create(createJobDto: CreateJobDto) {
    try {
      const createdJob = new this.jobModel(createJobDto);
      await createdJob.save();

      switch (createdJob.type) {
        case JOB_TYPE.ONE_TIME:
          this.createOneTimeJob(createdJob);
          break;
        case JOB_TYPE.NOW:
          this.createImmediateJob(createdJob);
          break;
        case JOB_TYPE.PERIOD:
          this.createPeriodJob(createdJob);
          break;
      }

      return createdJob;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async delete(deleteJobDto: DeleteJobDto) {
    const deleteStatus = await this.jobModel.deleteOne({
      author_id: deleteJobDto.job_id,
      _id: deleteJobDto.job_id,
    });
    this.schedulerRegistry.deleteCronJob(deleteJobDto.job_id);

    return deleteStatus;
  }

  createOneTimeJob(
    job: Document<unknown, {}, Job> & Job & { _id: Types.ObjectId },
  ) {
    const timeoutInterval = this.cronService.getCronTimeout(job.period_time);

    const callback = () => {
      this.logger.log('One Time Job called');
    };

    console.log(timeoutInterval);

    const timeout = setTimeout(callback, timeoutInterval);
    this.schedulerRegistry.addTimeout(job._id.toString(), timeout);
  }
  createImmediateJob(
    job: Document<unknown, {}, Job> & Job & { _id: Types.ObjectId },
  ) {
    this.mqttService.publish('demo', 'Hello?');
  }
  createPeriodJob(
    job: Document<unknown, {}, Job> & Job & { _id: Types.ObjectId },
  ) {
    const cronKey = this.cronService.genCronKey(job.period, job.period_time);

    const cronJob = new CronJob(cronKey, () => {
      console.log('Hello');
      this.logger.warn('Hello');
    });

    this.schedulerRegistry.addCronJob(job._id.toString(), cronJob);
    cronJob.start();
  }
}
