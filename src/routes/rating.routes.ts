import { Router } from 'express';
import { ratingController } from '@/controllers/rating.controller';
import { optionalAuth, authenticateToken } from '@/middlewares/auth';

const router = Router();

// Rating routes
router.post('/', optionalAuth, ratingController.createRating);
router.get('/stats/:moduleId', ratingController.getRatingStats);

export { router as ratingRoutes };