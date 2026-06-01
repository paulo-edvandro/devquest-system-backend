import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { config } from '@/config/config';
import { ApiResponse } from '@/types/api';
import { AuthenticatedRequest } from '@/middlewares/auth';

// Validation schemas
const completeModuleSchema = z.object({
  moduleSlug: z.string().min(1, 'Module slug is required'),
  score: z.number().min(0, 'Score must be non-negative'),
  totalQuestions: z.number().min(1, 'Total questions must be positive'),
});

async function addXPAndCheckLevel(userId: string, moduleId: string, xpAmount: number, reason: string) {
  await Promise.all([
    prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpAmount },
      },
    }),
    prisma.xPTransaction.create({
      data: {
        userId,
        moduleId,
        amount: xpAmount,
        reason,
      },
    }),
  ]);
}

async function checkLevelUp(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true, level: true },
  });

  if (!user) return false;

  const newLevel = Math.floor(user.xp / config.xp.perLevel) + 1;

  if (newLevel > user.level) {
    await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: {
          level: newLevel,
          xp: { increment: config.xp.levelUpBonus },
        },
      }),
      prisma.xPTransaction.create({
        data: {
          userId,
          amount: config.xp.levelUpBonus,
          reason: 'level_up_bonus',
        },
      }),
    ]);

    return true;
  }

  return false;
}

export const progressController = {
  async completeModule(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { moduleSlug, score, totalQuestions } = completeModuleSchema.parse(req.body);

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

      // Calculate XP gained
      const gainedXP = score * config.xp.perCorrectAnswer;

      // Get or create module progress
      const existingProgress = await prisma.moduleProgress.findUnique({
        where: {
          userId_moduleId: {
            userId: req.userId!,
            moduleId: module.id,
          },
        },
      });

      let moduleProgress;
      let leveledUp = false;

      if (existingProgress) {
        // Update existing progress
        moduleProgress = await prisma.moduleProgress.update({
          where: { id: existingProgress.id },
          data: {
            completed: true,
            score: Math.max(existingProgress.score, score), // Keep best score
            gainedXP: existingProgress.completed ? existingProgress.gainedXP : gainedXP, // Only gain XP first time
            attempts: existingProgress.attempts + 1,
            completedAt: existingProgress.completed ? existingProgress.completedAt : new Date(),
          },
        });

        // Only add XP if not previously completed
        if (!existingProgress.completed && gainedXP > 0) {
          await addXPAndCheckLevel(req.userId!, module.id, gainedXP, 'quiz_completion');
          leveledUp = await checkLevelUp(req.userId!);
        }
      } else {
        // Create new progress
        moduleProgress = await prisma.moduleProgress.create({
          data: {
            userId: req.userId!,
            moduleId: module.id,
            completed: true,
            score,
            gainedXP,
            attempts: 1,
            completedAt: new Date(),
          },
        });

        // Add XP for completion
        if (gainedXP > 0) {
          await addXPAndCheckLevel(req.userId!, module.id, gainedXP, 'quiz_completion');
          leveledUp = await checkLevelUp(req.userId!);
        }
      }

      res.json({
        success: true,
        data: {
          moduleProgress,
          gainedXP: existingProgress?.completed ? 0 : gainedXP,
          leveledUp,
        },
        message: existingProgress?.completed 
          ? 'Module progress updated' 
          : 'Module completed successfully',
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
};
