import { Schema, model } from 'mongoose';

const ShelfItemSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['anime', 'book', 'game', 'music'], required: true },
  label: { type: String, required: true },
  caption: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, required: true }
});

export const ShelfItem = model('ShelfItem', ShelfItemSchema);
