import { Router } from "express";
import { userController } from "@/controllers/user.controller";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { authenticateToken } from "@/middlewares/auth";

const router = Router();

// All user routes require authentication
router.use(asyncHandler(authenticateToken));

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: 👤 Obter perfil do usuário
 *     description: Retorna informações do perfil do usuário logado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Perfil do usuário
 *       401:
 *         description: ❌ Não autenticado
 */
router.get("/profile", asyncHandler(userController.getProfile));

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: ✏️ Atualizar perfil
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             displayName: "Novo Nome"
 *     responses:
 *       200:
 *         description: ✅ Perfil atualizado
 */
router.put("/profile", asyncHandler(userController.updateProfile));

/**
 * @swagger
 * /api/users/progress:
 *   get:
 *     tags: [Users]
 *     summary: 📊 Progresso completo
 *     description: XP, nível e progresso em todos os módulos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Progresso do usuário
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalXP: 150
 *                 level: 2
 *                 xpInCurrentLevel: 50
 *                 xpForNextLevel: 50
 *                 completedModules: 2
 *                 totalModules: 4
 */
router.get("/progress", asyncHandler(userController.getProgress));

/**
 * @swagger
 * /api/users/xp-history:
 *   get:
 *     tags: [Users]
 *     summary: 📜 Histórico de XP
 *     description: Lista todas as transações de XP do usuário
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Histórico de XP
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 transactions:
 *                   - amount: 60
 *                     reason: "quiz_completion"
 *                     moduleTitle: "Fundamentos..."
 *                     createdAt: "2024-01-15T10:30:00Z"
 */
router.get("/xp-history", asyncHandler(userController.getXPHistory));

export { router as userRoutes };
