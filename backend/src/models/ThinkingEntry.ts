import { Schema, model } from 'mongoose';

const ThinkingEntrySchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true }
});

export const ThinkingEntry = model('ThinkingEntry', ThinkingEntrySchema);
