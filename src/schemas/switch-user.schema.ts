import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const SwitchUserSchema = new mongoose.Schema({
  user_id: String,
  switch: { type: Schema.Types.ObjectId, ref: 'Switch' },
});
