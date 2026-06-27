import { Router } from 'express';
import { WorkExperience } from '../models/WorkExperience';
import { Education } from '../models/Education';
import { protect } from '../middleware/auth';

const router = Router();

// GET experiences
router.get('/work', async (req, res) => {
  try {
    const experiences = await WorkExperience.find().sort({ order: 1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving work experience' });
  }
});

// GET education
router.get('/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving education logs' });
  }
});

// Admin CRUD - WorkExperience
router.post('/admin/work', protect, async (req, res) => {
  try {
    const experience = await WorkExperience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error creating work experience entry' });
  }
});

router.put('/admin/work/:id', protect, async (req, res) => {
  try {
    const experience = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error updating work experience entry' });
  }
});

router.delete('/admin/work/:id', protect, async (req, res) => {
  try {
    await WorkExperience.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Work experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting work experience entry' });
  }
});

// Admin CRUD - Education
router.post('/admin/education', protect, async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error creating education entry' });
  }
});

router.put('/admin/education/:id', protect, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error updating education entry' });
  }
});

router.delete('/admin/education/:id', protect, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Education entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education entry' });
  }
});

export default router;
