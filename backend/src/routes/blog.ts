import { Router } from 'express';
import { BlogPost } from '../models/BlogPost';
import { protect } from '../middleware/auth';

const router = Router();

// GET published blog posts
router.get('/blog', async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog posts' });
  }
});

// GET blog post by slug, incrementing view count
router.get('/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog post' });
  }
});

// Admin Blog CRUD
router.post('/admin/blog', protect, async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post entry' });
  }
});

router.put('/admin/blog/:id', protect, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post entry' });
  }
});

router.delete('/admin/blog/:id', protect, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post entry' });
  }
});

export default router;
