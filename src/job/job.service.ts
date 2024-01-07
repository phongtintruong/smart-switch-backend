/* eslint-disable @typescript-eslint/ban-types */
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Document, Model, Types } from 'mongoose';
import { CronService } from 'src/cron/cron.service';
import { HistoryService } from 'src/history/history.service';
import { JOB_ACTION, JOB_TYPE, SWITCH_STATUS } from 'src/interfaces/constants';
import { CreateHistoryDto } from 'src/interfaces/history.interface';
import { CreateJobDto, DeleteJobDto, Job } from 'src/interfaces/job.interface';
import { MqttService } from 'src/mqtt/mqtt.service';
import { SwitchService } from 'src/switch/switch.service';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_MODEL')
    private jobModel: Model<Job>,

    private schedulerRegistry: SchedulerRegistry,
    private cronService: CronService,
    private mqttService: MqttService,
    private switchService: SwitchService,
    private historyService: HistoryService,
  ) {}

  private readonly logger = new Logger(JobService.name);

  async getAll(user_id: string) {
    return await this.jobModel.find({ author_id: user_id });
  }

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
      this.runJob(job);

      const createHistoryDto: CreateHistoryDto = {
        user_id: job.author_id,
        job_id: job.id,
        execution_time: new Date(),
      };

      this.historyService.create(createHistoryDto);
    };
    const timeout = setTimeout(callback, timeoutInterval);
    this.schedulerRegistry.addTimeout(job._id.toString(), timeout);
  }
  createImmediateJob(
    job: Document<unknown, {}, Job> & Job & { _id: Types.ObjectId },
  ) {
    const createHistoryDto: CreateHistoryDto = {
      user_id: job.author_id,
      job_id: job.id,
      execution_time: new Date(),
    };

    this.historyService.create(createHistoryDto);
    this.runJob(job);
  }

  createPeriodJob(
    job: Document<unknown, {}, Job> & Job & { _id: Types.ObjectId },
  ) {
    const cronKey = this.cronService.genCronKey(job.period, job.period_time);

    const cronJob = new CronJob(cronKey, () => {
      const createHistoryDto: CreateHistoryDto = {
        user_id: job.author_id,
        job_id: job.id,
        execution_time: new Date(),
      };

      this.historyService.create(createHistoryDto);
      this.runJob(job);
    });

    this.schedulerRegistry.addCronJob(job._id.toString(), cronJob);
    cronJob.start();
  }

  async runJob(
    job: Document<unknown, {}, Job> & Job & { _id: Types.ObjectId },
  ) {
    const switchObject = await this.switchService.getOne(job.switch);
    let message = '';
    if (job.action === JOB_ACTION.FLIP) {
      switch (switchObject.status) {
        case SWITCH_STATUS.OFF:
          message = SWITCH_STATUS.ON;
          break;
        case SWITCH_STATUS.ON:
          message = SWITCH_STATUS.OFF;
          break;
      }
    } else {
      message = job.action;
    }

    const topic = switchObject.topic;

    this.mqttService.publish(topic, message);
    this.mqttService.subscibe(`c-${topic}`);
  }
}
