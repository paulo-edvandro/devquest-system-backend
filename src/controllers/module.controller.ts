import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";
import { AuthenticatedRequest } from "@/middlewares/auth";

export const moduleController = {
  async getModules(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const modules = await prisma.module.findMany({
        where: { isActive: true },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          emoji: true,
          order: true,
          _count: {
            select: {
              questions: { where: { isActive: true } },
              videos: true,
              pdfMaterials: { where: { isActive: true } },
            },
          },
          ...(req.userId && {
            moduleProgress: {
              where: { userId: req.userId },
              select: {
                completed: true,
                score: true,
                gainedXP: true,
                attempts: true,
              },
            },
          }),
        },
        orderBy: { order: "asc" },
      });

      // compute locked per module using order and user's moduleProgress
      let prevIncomplete = false;

      const modulesWithProgress = modules.map((module: any) => {
        const progress = req.userId ? module.moduleProgress?.[0] || null : null;
        const completed = progress?.completed ?? false;
        const locked = prevIncomplete;

        if (!completed) {
          prevIncomplete = true;
        }

        return {
          ...module,
          progress,
          locked,
          moduleProgress: undefined,
        };
      });

      res.json({
        success: true,
        data: modulesWithProgress,
      });
    } catch (error) {
      throw error;
    }
  },

  async getModuleBySlug(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { slug } = req.params;

      const module = await prisma.module.findFirst({
        where: {
          slug,
          isActive: true,
        },
        include: {
          questions: {
            where: { isActive: true },
            orderBy: { order: "asc" },
            select: {
              id: true,
              text: true,
              options: true,
              order: true,
            },
          },
          videos: {
            orderBy: { order: "asc" },
          },
          pdfMaterials: {
            where: { isActive: true },
            orderBy: { order: "asc" },
          },
          ...(req.userId && {
            moduleProgress: {
              where: { userId: req.userId },
            },
          }),
        },
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: "Module not found",
        });
      }

      // Determine if this module is locked for the current user
      let locked = false;

      if (req.userId) {
        const currentOrder = (module as any).order;

        const previousModules = await prisma.module.findMany({
          where: {
            isActive: true,
            order: { lt: currentOrder },
          },
          select: {
            id: true,
            moduleProgress: {
              where: { userId: req.userId },
              select: { completed: true },
            },
          },
          orderBy: { order: "asc" },
        });

        const hasPrevNotCompleted = previousModules.some(
          (m: any) => !m.moduleProgress?.[0]?.completed,
        );

        locked = hasPrevNotCompleted;
      }

      const moduleWithProgress = {
        ...module,
        progress: req.userId
          ? (module as any).moduleProgress?.[0] || null
          : null,
        locked,
        moduleProgress: undefined,
      };

      res.json({
        success: true,
        data: moduleWithProgress,
      });
    } catch (error) {
      throw error;
    }
  },

  async getModuleQuestions(
    req: AuthenticatedRequest,
    res: Response<ApiResponse>,
  ) {
    try {
      const { slug } = req.params;

      const module = await prisma.module.findFirst({
        where: {
          slug,
          isActive: true,
        },
        select: { id: true },
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: "Module not found",
        });
      }

      const questions = await prisma.question.findMany({
        where: {
          moduleId: module.id,
          isActive: true,
        },
        select: {
          id: true,
          text: true,
          options: true,
          order: true,
        },
        orderBy: { order: "asc" },
      });

      res.json({
        success: true,
        data: questions,
      });
    } catch (error) {
      throw error;
    }
  },

  async getModuleVideos(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { slug } = req.params;

      const module = await prisma.module.findFirst({
        where: {
          slug,
          isActive: true,
        },
        select: { id: true },
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: "Module not found",
        });
      }

      const videos = await prisma.video.findMany({
        where: { moduleId: module.id },
        orderBy: { order: "asc" },
      });

      res.json({
        success: true,
        data: videos,
      });
    } catch (error) {
      throw error;
    }
  },

  async getModuleMaterials(
    req: AuthenticatedRequest,
    res: Response<ApiResponse>,
  ) {
    try {
      const { slug } = req.params;

      const module = await prisma.module.findFirst({
        where: {
          slug,
          isActive: true,
        },
        select: { id: true },
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: "Module not found",
        });
      }

      const materials = await prisma.pDFMaterial.findMany({
        where: {
          moduleId: module.id,
          isActive: true,
        },
        orderBy: { order: "asc" },
      });

      res.json({
        success: true,
        data: materials,
      });
    } catch (error) {
      throw error;
    }
  },
};
