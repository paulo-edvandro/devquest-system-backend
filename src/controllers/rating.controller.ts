import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types/api';
import { AuthenticatedRequest } from '@/middlewares/auth';

// Validation schemas
const createRatingSchema = z.object({
  moduleSlug: z.string().min(1, 'Module slug is required'),
  stars: z.number().min(1, 'Stars must be at least 1').max(5, 'Stars must be at most 5'),
  clarity: z.enum(['Sim', 'Parcialmente', 'Não']).optional(),
  organized: z.enum(['Sim', 'Parcialmente', 'Não']).optional(),
  difficulty: z.enum(['Muito fácil', 'Fácil', 'Médio', 'Difícil', 'Muito difícil']).optional(),
  feedback: z.string().max(500, 'Feedback must be at most 500 characters').optional(),
});

export const ratingController = {
  async createRating(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const ratingData = createRatingSchema.parse(req.body);
      const { moduleSlug, ...rating } = ratingData;

      // Find the module
      const module = await prisma.module.findUnique({
        where: { slug: moduleSlug, isActive: true },
        select: { id: true, title: true },
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: 'Module not found',
        });
      }

      // Check if user already rated this module (if authenticated)
      if (req.userId) {
        const existingRating = await prisma.rating.findFirst({
          where: {
            userId: req.userId,
            moduleId: module.id,
          },
        });

        if (existingRating) {
          // Update existing rating
          const updatedRating = await prisma.rating.update({
            where: { id: existingRating.id },
            data: rating,
          });

          return res.json({
            success: true,
            data: updatedRating,
            message: 'Rating updated successfully',
          });
        }
      }

      // Create new rating
      const newRating = await prisma.rating.create({
        data: {
          ...rating,
          moduleId: module.id,
          userId: req.userId || null, // Allow anonymous ratings
        },
      });

      res.status(201).json({
        success: true,
        data: newRating,
        message: 'Rating created successfully',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          message: error.errors.map(e => e.message).join(', '),
        });
      }
      throw error;
    }
  },

  async getRatingStats(req: Request, res: Response<ApiResponse>) {
    try {
      const { moduleId } = req.params;

      // Verify module exists
      const module = await prisma.module.findUnique({
        where: { id: moduleId, isActive: true },
        select: { id: true, title: true },
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: 'Module not found',
        });
      }

      // Get rating statistics
      const [ratings, starStats] = await Promise.all([
        // Get all ratings for basic stats
        prisma.rating.findMany({
          where: { moduleId },
          select: {
            stars: true,
            clarity: true,
            organized: true,
            difficulty: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        
        // Get star distribution
        prisma.rating.groupBy({
          by: ['stars'],
          where: { moduleId },
          _count: { stars: true },
        }),
      ]);

      const totalRatings = ratings.length;
      
      if (totalRatings === 0) {
        return res.json({
          success: true,
          data: {
            moduleId,
            moduleTitle: module.title,
            totalRatings: 0,
            averageStars: 0,
            starDistribution: [],
            clarityStats: {},
            organizedStats: {},
            difficultyStats: {},
          },
        });
      }

      // Calculate statistics
      const averageStars = ratings.reduce((sum, r) => sum + r.stars, 0) / totalRatings;

      const starDistribution = Array.from({ length: 5 }, (_, i) => {
        const stars = i + 1;
        const count = starStats.find(s => s.stars === stars)?._count.stars || 0;
        return {
          stars,
          count,
          percentage: totalRatings > 0 ? (count / totalRatings) * 100 : 0,
        };
      });

      // Calculate clarity stats
      const clarityStats = ratings.reduce((acc, r) => {
        if (r.clarity) {
          acc[r.clarity] = (acc[r.clarity] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Calculate organized stats
      const organizedStats = ratings.reduce((acc, r) => {
        if (r.organized) {
          acc[r.organized] = (acc[r.organized] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Calculate difficulty stats
      const difficultyStats = ratings.reduce((acc, r) => {
        if (r.difficulty) {
          acc[r.difficulty] = (acc[r.difficulty] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      res.json({
        success: true,
        data: {
          moduleId,
          moduleTitle: module.title,
          totalRatings,
          averageStars: Math.round(averageStars * 10) / 10, // Round to 1 decimal
          starDistribution,
          clarityStats,
          organizedStats,
          difficultyStats,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};