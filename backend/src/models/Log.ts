import { Schema, model } from 'mongoose';

const LogSchema = new Schema({
  content: { type: String, required: true },
  accentColor: { type: String, enum: ['amber', 'teal', 'rose'], required: true },
  date: { type: Date, default: Date.now },
  published: { type: Boolean, default: true }
});

export const Log = model('Log', LogSchema);
