import { Schema, model } from 'mongoose';

const LatelyEntrySchema = new Schema({
  label: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true }
});

export const LatelyEntry = model('LatelyEntry', LatelyEntrySchema);
