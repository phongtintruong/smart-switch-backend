import { ObjectId } from 'mongoose';

export interface History {
  user_id: string;
  job_id: ObjectId;
  execution_time: Date;
}

export interface CreateHistoryDto {
  user_id: string;
  job_id: ObjectId;
  execution_time: Date;
}
