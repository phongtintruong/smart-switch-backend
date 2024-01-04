import * as mongoose from 'mongoose';

export const SwitchSchema = new mongoose.Schema({
  id: String,
  topic: {
    type: String,
    required: false,
  },
  status: String,
});
