import { Response } from "express";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { config } from "@/config/config";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { AuthenticatedRequest } from "@/middlewares/auth";
// Validation schemas
const addXPSchema = z.object({
  amount: z.number().min(1, "XP amount must be positive"),
  reason: z.string().min(1, "Reason is required"),
  moduleId: z.string().optional(),
});

export const xpController = {
  async addXP(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { amount, reason, moduleId } = addXPSchema.parse(req.body);

      // Verify module exists if provided
      if (moduleId) {
        const module = await prisma.module.findUnique({
          where: { id: moduleId, isActive: true },
        });

        if (!module) {
          return res.status(404).json({
            success: false,
            error: "Module not found",
          });
        }
      }

      // Get current user data
      const currentUser = await prisma.user.findUnique({
        where: { id: req.userId! },
        select: { xp: true, level: true },
      });

      if (!currentUser) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      const oldLevel = currentUser.level;
      const newXP = currentUser.xp + amount;
      const newLevel = Math.floor(newXP / config.xp.perLevel) + 1;
      const leveledUp = newLevel > oldLevel;

      // Calculate level up bonus if applicable
      let totalXPToAdd = amount;
      const transactions = [];

      // Add base XP transaction
      transactions.push({
        userId: req.userId!,
        moduleId: moduleId || null,
        amount,
        reason,
      });

      // Add level up bonus if user leveled up
      if (leveledUp) {
        const levelsGained = newLevel - oldLevel;
        const levelUpBonus = levelsGained * config.xp.levelUpBonus;
        totalXPToAdd += levelUpBonus;

        transactions.push({
          userId: req.userId!,
          moduleId: null,
          amount: levelUpBonus,
          reason: "level_up_bonus",
        });
      }

      // Execute all updates in a transaction
      const [updatedUser] = await prisma.$transaction([
        // Update user XP and level
        prisma.user.update({
          where: { id: req.userId! },
          data: {
            xp:
              newXP +
              (leveledUp ? (newLevel - oldLevel) * config.xp.levelUpBonus : 0),
            level: newLevel,
          },
          select: {
            id: true,
            xp: true,
            level: true,
          },
        }),
        // Create XP transactions
        ...transactions.map((tx) => prisma.xPTransaction.create({ data: tx })),
      ]);

      res.json({
        success: true,
        data: {
          user: updatedUser,
          xpGained: totalXPToAdd,
          leveledUp,
          oldLevel,
          newLevel,
        },
        message: leveledUp
          ? `Gained ${amount} XP and leveled up to level ${newLevel}!`
          : `Gained ${amount} XP`,
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

  async getXPHistory(
    req: AuthenticatedRequest,
    res: Response<
      PaginatedResponse<{
        transactions: {
          id: string;
          amount: number;
          reason: string;
          module: {
            id: string;
            title: string;
            slug: string;
          } | null;
          createdAt: Date;
        }[];
      }>
    >,
  ) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const [transactions, total] = await Promise.all([
        prisma.xPTransaction.findMany({
          where: { userId: req.userId! },
          include: {
            module: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: Number(limit),
        }),
        prisma.xPTransaction.count({
          where: { userId: req.userId! },
        }),
      ]);

      const totalPages = Math.ceil(total / Number(limit));

      res.json({
        success: true,
        data: {
          transactions: transactions.map((tx) => ({
            id: tx.id,
            amount: tx.amount,
            reason: tx.reason,
            module: tx.module,
            createdAt: tx.createdAt,
          })),
        },
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: totalPages,
          hasNext: Number(page) < totalPages,
          hasPrev: Number(page) > 1,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

