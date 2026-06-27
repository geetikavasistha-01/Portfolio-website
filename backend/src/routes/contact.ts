import { Router } from 'express';
import rateLimit from 'express-rate-limit';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit to 5 submissions per hour
  message: { message: 'Too many messages sent. Please try again in an hour.' }
});

router.post('/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All contact fields are required.' });
  }

  // Simulate logging message and responding (could be connected to nodemailer/Resend)
  console.log(`[Contact Submission] from ${name} (${email}): ${message}`);
  
  res.status(200).json({ success: true, message: 'Message received successfully!' });
});

export default router;
