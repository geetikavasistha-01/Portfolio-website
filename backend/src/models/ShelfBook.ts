import { Schema, model } from 'mongoose';

const ShelfBookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  type: { type: String, enum: ['physical', 'paper'], required: true },
  category: { type: String, required: true },
  spineColor: { type: String },
  spineHeight: { type: Number, required: true },
  spineWidth: { type: Number, required: true },
  coverUrl: { type: String },
  externalUrl: { type: String },
  status: { type: String, enum: ['read', 'reading', 'want-to-read'], required: true },
  inReadingList: { type: Boolean, required: true, default: false },
  order: { type: Number, required: true }
});

export const ShelfBook = model('ShelfBook', ShelfBookSchema);
