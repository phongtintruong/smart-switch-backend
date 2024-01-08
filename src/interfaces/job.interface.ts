import { JOB_ACTION, JOB_PERIOD_TYPE, JOB_TYPE } from './constants';

export interface Job {
  author_id: string;
  switch: string;
  type: JOB_TYPE;
  start_time?: Date;
  end_time?: Date;
  period?: JOB_PERIOD_TYPE;
  period_time?: Date;
  action: JOB_ACTION;
}

export interface CreateJobDto {
  author_id?: string;
  switch: string;
  type: JOB_TYPE;
  start_time?: Date;
  end_time?: Date;
  period: JOB_PERIOD_TYPE;
  period_time?: Date;
  action: JOB_ACTION;
}

export interface DeleteJobDto {
  user_id: string;
  job_id: string;
}
