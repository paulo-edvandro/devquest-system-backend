import { Response } from "express";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { config } from "@/config/config";
import { ApiResponse } from "@/types/api";
import { UserProgressResponse, XPHistoryResponse } from "@/types/user";
import { AuthenticatedRequest } from "@/middlewares/auth";

// Validation schemas
const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .optional(),
});

export const userController = {
  async getProfile(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          email: true,
          displayName: true,
          xp: true,
          level: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { displayName } = updateProfileSchema.parse(req.body);

      const user = await prisma.user.update({
        where: { id: req.userId },
        data: { displayName },
        select: {
          id: true,
          email: true,
          displayName: true,
          xp: true,
          level: true,
          updatedAt: true,
        },
      });

      res.json({
        success: true,
        data: user,
        message: "Profile updated successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          message: error.errors.map((e) => e.message).join(", "),
        });
      }
      throw error;
    }
  },

  async getProgress(
    req: AuthenticatedRequest,
    res: Response<ApiResponse<UserProgressResponse>>,
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { xp: true, level: true },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      const modules = await prisma.module.findMany({
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          slug: true,
          order: true,
          moduleProgress: {
            where: { userId: req.userId },
            select: {
              completed: true,
              score: true,
              gainedXP: true,
              attempts: true,
            },
          },
        },
        orderBy: { order: "asc" },
      });

      // Build module progress with locked flag based on module order
      let previousIncomplete = false;

      const moduleProgress = modules.map((module) => {
        const progress = module.moduleProgress[0];

        const completed = progress?.completed ?? false;
        const locked = previousIncomplete;

        if (!completed) {
          previousIncomplete = true;
        }

        return {
          moduleId: module.id,
          moduleTitle: module.title,
          moduleSlug: module.slug,
          completed,
          score: progress?.score ?? 0,
          gainedXP: progress?.gainedXP ?? 0,
          attempts: progress?.attempts ?? 0,
          locked,
        };
      });

      const totalModules = modules.length;
      const completedModules = moduleProgress.filter(
        (mp) => mp.completed,
      ).length;

      // Calculate XP for current level and next level
      const xpInCurrentLevel = user.xp % config.xp.perLevel;
      const xpForNextLevel = config.xp.perLevel - xpInCurrentLevel;

      const progressData: UserProgressResponse = {
        totalXP: user.xp,
        level: user.level,
        xpInCurrentLevel,
        xpForNextLevel,
        completedModules,
        totalModules,
        moduleProgress,
      };

      res.json({
        success: true,
        data: progressData,
      });
    } catch (error) {
      throw error;
    }
  },

  async getXPHistory(
    req: AuthenticatedRequest,
    res: Response<ApiResponse<XPHistoryResponse>>,
  ) {
    try {
      const transactions = await prisma.xPTransaction.findMany({
        where: { userId: req.userId },
        include: {
          module: {
            select: { title: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 50, // Limit to recent 50 transactions
      });

      const historyData: XPHistoryResponse = {
        transactions: transactions.map((tx) => ({
          id: tx.id,
          amount: tx.amount,
          reason: tx.reason,
          moduleTitle: tx.module?.title,
          createdAt: tx.createdAt,
        })),
      };

      res.json({
        success: true,
        data: historyData,
      });
    } catch (error) {
      throw error;
    }
  },
};
