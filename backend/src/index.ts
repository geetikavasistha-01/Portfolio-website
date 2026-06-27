import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Import Routes
import adminRoutes from './routes/admin';
import workRoutes from './routes/work';
import projectRoutes from './routes/projects';
import blogRoutes from './routes/blog';
import logRoutes from './routes/logs';
import amaRoutes from './routes/ama';
import externalRoutes from './routes/external';
import contactRoutes from './routes/contact';
import shelfRoutes from './routes/shelf';
import videoRoutes from './routes/videos';
import glanceRoutes from './routes/glance';
import humanRoutes from './routes/human';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for local development testing ease
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API Routes
app.use('/api', adminRoutes);
app.use('/api', workRoutes);
app.use('/api', projectRoutes);
app.use('/api', blogRoutes);
app.use('/api', logRoutes);
app.use('/api', amaRoutes);
app.use('/api', externalRoutes);
app.use('/api', contactRoutes);
app.use('/api', shelfRoutes);
app.use('/api', videoRoutes);
app.use('/api', glanceRoutes);
app.use('/api', humanRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Geetika Portfolio API (TS) is fully operational' });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[GV_OS Server] Listening on port ${PORT}`);
});

export default app;
