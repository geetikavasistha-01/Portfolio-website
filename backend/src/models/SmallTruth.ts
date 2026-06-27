import { Schema, model } from 'mongoose';

const SmallTruthSchema = new Schema({
  content: { type: String, required: true },
  order: { type: Number, required: true }
});

export const SmallTruth = model('SmallTruth', SmallTruthSchema);
