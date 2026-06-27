import { Schema, model } from 'mongoose';

const SpotifyPlaylistSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  spotifyUrl: { type: String, required: true },
  coverUrl: { type: String, required: true },
  tracks: [{
    title: { type: String, required: true },
    artist: { type: String, required: true },
    explicit: { type: Boolean, default: false }
  }],
  order: { type: Number, required: true }
});

export const SpotifyPlaylist = model('SpotifyPlaylist', SpotifyPlaylistSchema);
