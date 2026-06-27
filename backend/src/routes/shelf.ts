import { Router } from 'express';
import { ShelfBook } from '../models/ShelfBook';
import { protect } from '../middleware/auth';

const router = Router();

// Retrieve all books grouped by category
router.get('/shelf/books', async (req, res) => {
  try {
    const books = await ShelfBook.find().sort({ order: 1 });
    const grouped = books.reduce((acc: { [key: string]: any[] }, book) => {
      const cat = book.category;
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(book);
      return acc;
    }, {});
    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving shelf books' });
  }
});

// Retrieve books in reading list
router.get('/shelf/reading-list', async (req, res) => {
  try {
    const list = await ShelfBook.find({ inReadingList: true }).sort({ order: 1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reading list' });
  }
});

// Admin CRUD
router.post('/admin/shelf/books', protect, async (req, res) => {
  try {
    const book = await ShelfBook.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shelf book' });
  }
});

router.put('/admin/shelf/books/:id', protect, async (req, res) => {
  try {
    const book = await ShelfBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shelf book' });
  }
});

router.delete('/admin/shelf/books/:id', protect, async (req, res) => {
  try {
    const book = await ShelfBook.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Shelf book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shelf book' });
  }
});

export default router;
