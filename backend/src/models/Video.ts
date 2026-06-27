import { Schema, model } from 'mongoose';

const VideoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  order: { type: Number, required: true }
});

export const Video = model('Video', VideoSchema);
