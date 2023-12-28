import * as mongoose from 'mongoose';

export const SwitchUserSchema = new mongoose.Schema({
  user_id: String,
  switch_id: String,
});
