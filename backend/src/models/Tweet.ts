import { Schema, model } from 'mongoose';

const TweetSchema = new Schema({
  tweetId: { type: String, required: true },
  order: { type: Number, required: true }
});

export const Tweet = model('Tweet', TweetSchema);
