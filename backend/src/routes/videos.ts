import { Router } from 'express';
import { Video } from '../models/Video';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving videos' });
  }
});

router.post('/admin/videos', protect, async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video entry' });
  }
});

router.delete('/admin/videos/:id', protect, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video entry' });
  }
});

export default router;
