import { Schema, model } from 'mongoose';

const AnimeItemSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  genres: [{ type: String }],
  posterUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  order: { type: Number, required: true }
});

export const AnimeItem = model('AnimeItem', AnimeItemSchema);
