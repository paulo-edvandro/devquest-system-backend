import { Router } from "express";
import { progressController } from "@/controllers/progress.controller";
import { authenticateToken } from "@/middlewares/auth";

const router = Router();

// All progress routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/progress/complete-module:
 *   post:
 *     tags: [Progress]
 *     summary: 🏆 Completar módulo
 *     description: Marca um módulo como completado e atribui XP baseado no score
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [moduleSlug, score, totalQuestions]
 *             properties:
 *               moduleSlug:
 *                 type: string
 *                 description: Slug do módulo completado
 *                 enum: [fundamentos, pandas, exploracao, visualizacao]
 *               score:
 *                 type: integer
 *                 minimum: 0
 *                 description: Número de questões respondidas corretamente
 *               totalQuestions:
 *                 type: integer
 *                 minimum: 1
 *                 description: Número total de questões do módulo
 *           examples:
 *             perfectScore:
 *               summary: 🎆 Pontuação perfeita
 *               value:
 *                 moduleSlug: "pandas"
 *                 score: 3
 *                 totalQuestions: 3
 *             partialScore:
 *               summary: 👍 Pontuação parcial
 *               value:
 *                 moduleSlug: "fundamentos"
 *                 score: 2
 *                 totalQuestions: 3
 *             zeroScore:
 *               summary: 😬 Sem acertos
 *               value:
 *                 moduleSlug: "exploracao"
 *                 score: 0
 *                 totalQuestions: 3
 *     responses:
 *       200:
 *         description: ✅ Módulo completado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         moduleProgress:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             completed:
 *                               type: boolean
 *                             score:
 *                               type: integer
 *                             gainedXP:
 *                               type: integer
 *                             attempts:
 *                               type: integer
 *                         gainedXP:
 *                           type: integer
 *                           description: XP ganho nesta sessão (0 se já completado antes)
 *                         leveledUp:
 *                           type: boolean
 *                           description: Se o usuário subiu de nível
 *             examples:
 *               firstCompletion:
 *                 summary: Primeira conclusão - Ganhou XP
 *                 value:
 *                   success: true
 *                   data:
 *                     moduleProgress:
 *                       id: "cm123456789"
 *                       completed: true
 *                       score: 3
 *                       gainedXP: 60
 *                       attempts: 1
 *                     gainedXP: 60
 *                     leveledUp: true
 *                   message: "Module completed successfully"
 *               alreadyCompleted:
 *                 summary: Já completado - Sem XP
 *                 value:
 *                   success: true
 *                   data:
 *                     moduleProgress:
 *                       id: "cm123456789"
 *                       completed: true
 *                       score: 3
 *                       gainedXP: 60
 *                       attempts: 2
 *                     gainedXP: 0
 *                     leveledUp: false
 *                   message: "Module progress updated"
 *       401:
 *         description: ❌ Não autenticado
 *       404:
 *         description: ❌ Módulo não encontrado
 *       400:
 *         description: ❌ Dados inválidos
 */
router.post("/complete-module", progressController.completeModule);

export { router as progressRoutes };
