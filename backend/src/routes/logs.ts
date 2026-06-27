import { Router } from 'express';
import { Log } from '../models/Log';
import { protect } from '../middleware/auth';

const router = Router();

// GET latest 3 logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find({ published: true })
      .sort({ date: -1 })
      .limit(3);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving journal logs' });
  }
});

// Admin Log CRUD
router.post('/admin/logs', protect, async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Error creating log entry' });
  }
});

router.delete('/admin/logs/:id', protect, async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Log entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting log entry' });
  }
});

export default router;
