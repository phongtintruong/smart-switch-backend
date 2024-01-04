import { JOB_PERIOD_TYPE, JOB_TYPE } from './constants';

export interface Job {
  author_id: string;
  switch_id: string;
  type: JOB_TYPE;
  start_time?: Date;
  end_time?: Date;
  period?: JOB_PERIOD_TYPE;
  period_time?: Date;
  action: string;
}

export interface CreateJobDto {
  author_id?: string;
  switch_id: string;
  type: JOB_TYPE;
  start_time?: Date;
  end_time?: Date;
  period: JOB_PERIOD_TYPE;
  period_time?: Date;
  action: string;
}

export interface DeleteJobDto {
  user_id: string;
  job_id: string;
}
