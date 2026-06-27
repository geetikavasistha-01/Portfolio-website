import { Router } from 'express';
import { Tweet } from '../models/Tweet';
import { LatelyEntry } from '../models/LatelyEntry';
import { SpotifyPlaylist } from '../models/SpotifyPlaylist';
import { AnimeItem } from '../models/AnimeItem';
import { ThinkingEntry } from '../models/ThinkingEntry';
import { SmallTruth } from '../models/SmallTruth';
import { protect } from '../middleware/auth';

const router = Router();

// Tweets
router.get('/human/tweets', async (req, res) => {
  try {
    const list = await Tweet.find().sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tweets' });
  }
});

router.post('/admin/human/tweets', protect, async (req, res) => {
  try {
    const item = await Tweet.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tweet' });
  }
});

router.delete('/admin/human/tweets/:id', protect, async (req, res) => {
  try {
    await Tweet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tweet' });
  }
});

// Lately Entries
router.get('/human/lately', async (req, res) => {
  try {
    const list = await LatelyEntry.find().sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lately entries' });
  }
});

router.post('/admin/human/lately', protect, async (req, res) => {
  try {
    const item = await LatelyEntry.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lately entry' });
  }
});

router.put('/admin/human/lately/:id', protect, async (req, res) => {
  try {
    const item = await LatelyEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating lately entry' });
  }
});

router.delete('/admin/human/lately/:id', protect, async (req, res) => {
  try {
    await LatelyEntry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lately entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lately entry' });
  }
});

// Spotify Playlists
router.get('/human/playlists', async (req, res) => {
  try {
    const list = await SpotifyPlaylist.find().sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving spotify playlists' });
  }
});

router.post('/admin/human/playlists', protect, async (req, res) => {
  try {
    const item = await SpotifyPlaylist.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist' });
  }
});

router.put('/admin/human/playlists/:id', protect, async (req, res) => {
  try {
    const item = await SpotifyPlaylist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating playlist' });
  }
});

router.delete('/admin/human/playlists/:id', protect, async (req, res) => {
  try {
    await SpotifyPlaylist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist' });
  }
});

// Anime
router.get('/human/anime', async (req, res) => {
  try {
    const list = await AnimeItem.find().sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving anime list' });
  }
});

router.post('/admin/human/anime', protect, async (req, res) => {
  try {
    const item = await AnimeItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating anime' });
  }
});

router.put('/admin/human/anime/:id', protect, async (req, res) => {
  try {
    const item = await AnimeItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating anime' });
  }
});

router.delete('/admin/human/anime/:id', protect, async (req, res) => {
  try {
    await AnimeItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Anime deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting anime' });
  }
});

// Thinking Entries
router.get('/human/thinking', async (req, res) => {
  try {
    const list = await ThinkingEntry.find().sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving thinking entries' });
  }
});

router.post('/admin/human/thinking', protect, async (req, res) => {
  try {
    const item = await ThinkingEntry.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating thinking entry' });
  }
});

router.put('/admin/human/thinking/:id', protect, async (req, res) => {
  try {
    const item = await ThinkingEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating thinking entry' });
  }
});

router.delete('/admin/human/thinking/:id', protect, async (req, res) => {
  try {
    await ThinkingEntry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Thinking entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting thinking entry' });
  }
});

// Small Truths
router.get('/human/truths', async (req, res) => {
  try {
    const list = await SmallTruth.find().sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving small truths' });
  }
});

router.post('/admin/human/truths', protect, async (req, res) => {
  try {
    const item = await SmallTruth.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating small truth' });
  }
});

router.put('/admin/human/truths/:id', protect, async (req, res) => {
  try {
    const item = await SmallTruth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating small truth' });
  }
});

router.delete('/admin/human/truths/:id', protect, async (req, res) => {
  try {
    await SmallTruth.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Small truth deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting small truth' });
  }
});

export default router;
