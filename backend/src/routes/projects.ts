import { Router } from 'express';
import { Project } from '../models/Project';
import { SideExperiment } from '../models/SideExperiment';
import { protect } from '../middleware/auth';

const router = Router();

// GET projects with optional filters
router.get('/projects', async (req, res) => {
  const { featured } = req.query;
  const filter: any = {};
  if (featured === 'true') {
    filter.featured = true;
  }
  try {
    const projects = await Project.find(filter).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});

// GET featured projects
router.get('/projects/featured', async (req, res) => {
  try {
    const projects = await Project.find({ isFeatured: true }).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving featured projects' });
  }
});

// GET more work projects (flat list)
router.get('/projects/more', async (req, res) => {
  try {
    const projects = await Project.find({ isMoreWork: true }).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});

// GET side experiments
router.get('/projects/experiments', async (req, res) => {
  try {
    const experiments = await SideExperiment.find().sort({ order: 1 });
    res.status(200).json(experiments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving side experiments' });
  }
});

// GET project by slug
router.get('/projects/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project details' });
  }
});

// Admin Project CRUD
router.post('/admin/projects', protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project entry' });
  }
});

router.put('/admin/projects/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project entry' });
  }
});

router.delete('/admin/projects/:id', protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project entry' });
  }
});

// Admin SideExperiment CRUD
router.post('/admin/experiments', protect, async (req, res) => {
  try {
    const experiment = await SideExperiment.create(req.body);
    res.status(201).json(experiment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating side experiment entry' });
  }
});

router.delete('/admin/experiments/:id', protect, async (req, res) => {
  try {
    await SideExperiment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Side experiment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting side experiment' });
  }
});

export default router;
