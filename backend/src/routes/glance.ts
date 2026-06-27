import { Router } from 'express';
import { GlanceSettings } from '../models/GlanceSettings';
import { WorkExperience } from '../models/WorkExperience';
import { Project } from '../models/Project';
import { BlogPost } from '../models/BlogPost';
import { protect } from '../middleware/auth';

const router = Router();

// Retrieve Glance settings (singleton)
router.get('/glance/settings', async (req, res) => {
  try {
    let settings = await GlanceSettings.findOne({ _id: 'singleton' });
    if (!settings) {
      // Create a default singleton if it doesn't exist
      settings = await GlanceSettings.create({
        _id: 'singleton',
        bannerUrlTech: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        bannerUrlHuman: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        bioTech: 'ML Engineer & Data Scientist specializing in neural architectures and clean code.',
        bioHuman: 'Living at a slower pace. Enthusiastic about books, OSTs, and personal exploration.',
        latestQuoteTech: 'precision finds pattern',
        latestQuoteHuman: 'some things are better felt than explained.',
        toolkitItems: [
          { name: 'Python', iconSlug: 'python' },
          { name: 'React', iconSlug: 'react' },
          { name: 'TypeScript', iconSlug: 'typescript' }
        ]
      });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving glance settings' });
  }
});

// Retrieve work experiences for glance
router.get('/glance/work', async (req, res) => {
  try {
    const experiences = await WorkExperience.find().sort({ order: 1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving work experiences' });
  }
});

// Retrieve featured projects for glance (max 4)
router.get('/glance/projects', async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ featured: true }, { isFeatured: true }]
    }).sort({ order: 1 }).limit(4);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving glance projects' });
  }
});

// Retrieve latest blog posts (max 3)
router.get('/glance/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).limit(3);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving glance posts' });
  }
});

// Admin update settings
router.put('/admin/glance/settings', protect, async (req, res) => {
  try {
    const settings = await GlanceSettings.findOneAndUpdate(
      { _id: 'singleton' },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating glance settings' });
  }
});

export default router;
