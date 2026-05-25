import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types/api';
import { AuthenticatedRequest } from '@/middlewares/auth';

// Validation schemas
const answerQuestionSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedIndex: z.number().min(0, 'Selected index must be non-negative'),
});

export const questionController = {
  async answerQuestion(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { questionId, selectedIndex } = answerQuestionSchema.parse(req.body);

      // Find the question
      const question = await prisma.question.findUnique({
        where: { id: questionId, isActive: true },
        select: {
          id: true,
          correctIndex: true,
          explanation: true,
          options: true,
          module: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      if (!question) {
        return res.status(404).json({
          success: false,
          error: 'Question not found',
        });
      }

      // Validate selected index
      if (selectedIndex >= question.options.length) {
        return res.status(400).json({
          success: false,
          error: 'Invalid answer index',
        });
      }

      const isCorrect = selectedIndex === question.correctIndex;

      // Save user answer
      await prisma.userAnswer.create({
        data: {
          userId: req.userId!,
          questionId,
          selectedIndex,
          isCorrect,
        },
      });

      res.json({
        success: true,
        data: {
          questionId,
          isCorrect,
          correctIndex: question.correctIndex,
          explanation: question.explanation,
          selectedIndex,
        },
        message: isCorrect ? 'Correct answer!' : 'Incorrect answer',
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

  async getQuestionResult(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;

      // Get the user's latest answer for this question
      const userAnswer = await prisma.userAnswer.findFirst({
        where: {
          userId: req.userId!,
          questionId: id,
        },
        include: {
          question: {
            select: {
              id: true,
              text: true,
              options: true,
              correctIndex: true,
              explanation: true,
            },
          },
        },
        orderBy: { answeredAt: 'desc' },
      });

      if (!userAnswer) {
        return res.status(404).json({
          success: false,
          error: 'Answer not found',
          message: 'You have not answered this question yet',
        });
      }

      res.json({
        success: true,
        data: {
          questionId: userAnswer.question.id,
          questionText: userAnswer.question.text,
          options: userAnswer.question.options,
          selectedIndex: userAnswer.selectedIndex,
          correctIndex: userAnswer.question.correctIndex,
          isCorrect: userAnswer.isCorrect,
          explanation: userAnswer.question.explanation,
          answeredAt: userAnswer.answeredAt,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};