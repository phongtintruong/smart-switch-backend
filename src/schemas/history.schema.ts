import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const HistorySchema = new mongoose.Schema({
  user_id: String,
  job_id: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  execution_time: Date,
});
