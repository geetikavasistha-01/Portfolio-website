import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      if (username === 'admin' && password === 'admin') {
        const passwordHash = await bcrypt.hash('admin', 10);
        admin = await Admin.create({ username: 'admin', passwordHash });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your_jwt_secret_here', {
      expiresIn: '7d'
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
