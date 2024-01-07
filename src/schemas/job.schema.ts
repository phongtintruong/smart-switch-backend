import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
  author_id: String,
  switch: String,
  type: String,
  start_time: {
    type: Date,
    default: null,
  },
  end_time: {
    type: Date,
    default: null,
  },
  period: String,
  period_time: {
    type: Date,
    default: null,
  },
  action: String,
});
