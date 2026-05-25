import express from 'express';
import { setupSwagger } from '@/docs/swagger';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { config } from '@/config/config';
import { errorHandler } from '@/middlewares/errorHandler';
import { notFoundHandler } from '@/middlewares/notFoundHandler';
import { requestLogger } from '@/middlewares/requestLogger';

// Import routes
import { authRoutes } from '@/routes/auth.routes';
import { userRoutes } from '@/routes/user.routes';
import { moduleRoutes } from '@/routes/module.routes';
import { progressRoutes } from '@/routes/progress.routes';
import { questionRoutes } from '@/routes/question.routes';
import { ratingRoutes } from '@/routes/rating.routes';
import { xpRoutes } from '@/routes/xp.routes';

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
setupSwagger(app);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom middleware
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.server.env,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/xp', xpRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`🚀 DevQuest Backend Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.server.env}`);
  console.log(`🔗 CORS origin: ${config.cors.origin}`);
  console.log(`📚 PostgreSQL configured`);
  console.log(`\n📖 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🎮 Test Login: test@devquest.com / 123456`);
});

export default app;