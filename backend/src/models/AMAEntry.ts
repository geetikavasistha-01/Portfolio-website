import { Schema, model } from 'mongoose';

const AMAEntrySchema = new Schema({
  question: { type: String, required: true },
  askedBy: { type: String, default: 'ANONYMOUS' },
  answer: { type: String },
  pinned: { type: Boolean, default: false },
  answered: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

export const AMAEntry = model('AMAEntry', AMAEntrySchema);
