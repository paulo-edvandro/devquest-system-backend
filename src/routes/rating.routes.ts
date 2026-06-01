import { Router } from 'express';
import { ratingController } from '@/controllers/rating.controller';
import { asyncHandler } from '@/middlewares/asyncHandler';
import { optionalAuth } from '@/middlewares/auth';

const router = Router();

// Rating routes
router.post('/', optionalAuth, asyncHandler(ratingController.createRating));
router.get('/stats/:moduleId', asyncHandler(ratingController.getRatingStats));

export { router as ratingRoutes };
