import { Router } from "express";
import { questionController } from "@/controllers/question.controller";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { authenticateToken } from "@/middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/questions/answer:
 *   post:
 *     tags: [Questions]
 *     summary: ✍️ Responder questão
 *     description: Submete resposta para uma questão específica
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [questionId, selectedIndex]
 *             properties:
 *               questionId:
 *                 type: string
 *                 format: uuid
 *                 description: ID da questão
 *               selectedIndex:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 3
 *                 description: Índice da opção selecionada (0-3)
 *           examples:
 *             correctAnswer:
 *               summary: Resposta correta
 *               value:
 *                 questionId: "cm987654321"
 *                 selectedIndex: 2
 *             wrongAnswer:
 *               summary: Resposta incorreta
 *               value:
 *                 questionId: "cm987654321"
 *                 selectedIndex: 0
 *     responses:
 *       200:
 *         description: ✅ Resposta processada
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
 *                         questionId:
 *                           type: string
 *                         isCorrect:
 *                           type: boolean
 *                         correctIndex:
 *                           type: integer
 *                         explanation:
 *                           type: string
 *                         selectedIndex:
 *                           type: integer
 *             examples:
 *               correctAnswer:
 *                 summary: Resposta correta
 *                 value:
 *                   success: true
 *                   data:
 *                     questionId: "cm987654321"
 *                     isCorrect: true
 *                     correctIndex: 2
 *                     explanation: "Pandas é a biblioteca padrão..."
 *                     selectedIndex: 2
 *                   message: "Correct answer!"
 *               wrongAnswer:
 *                 summary: Resposta incorreta
 *                 value:
 *                   success: true
 *                   data:
 *                     questionId: "cm987654321"
 *                     isCorrect: false
 *                     correctIndex: 2
 *                     explanation: "Pandas é a biblioteca padrão..."
 *                     selectedIndex: 0
 *                   message: "Incorrect answer"
 *       401:
 *         description: ❌ Não autenticado
 *       404:
 *         description: ❌ Questão não encontrada
 *       400:
 *         description: ❌ Dados inválidos
 */
router.post(
  "/answer",
  asyncHandler(authenticateToken),
  asyncHandler(questionController.answerQuestion),
);

/**
 * @swagger
 * /api/questions/{id}/result:
 *   get:
 *     tags: [Questions]
 *     summary: 📊 Obter resultado da questão
 *     description: Retorna a última resposta do usuário para uma questão
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da questão
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "cm987654321"
 *     responses:
 *       200:
 *         description: ✅ Resultado da questão
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
 *                         questionId:
 *                           type: string
 *                         questionText:
 *                           type: string
 *                         options:
 *                           type: array
 *                           items:
 *                             type: string
 *                         selectedIndex:
 *                           type: integer
 *                         correctIndex:
 *                           type: integer
 *                         isCorrect:
 *                           type: boolean
 *                         explanation:
 *                           type: string
 *                         answeredAt:
 *                           type: string
 *                           format: date-time
 *             example:
 *               success: true
 *               data:
 *                 questionId: "cm987654321"
 *                 questionText: "Qual biblioteca Python é mais usada..."
 *                 options: ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"]
 *                 selectedIndex: 2
 *                 correctIndex: 2
 *                 isCorrect: true
 *                 explanation: "Pandas é a biblioteca padrão..."
 *                 answeredAt: "2024-01-15T14:30:00Z"
 *       401:
 *         description: ❌ Não autenticado
 *       404:
 *         description: ❌ Questão não encontrada ou não respondida
 */
router.get(
  "/:id/result",
  asyncHandler(authenticateToken),
  asyncHandler(questionController.getQuestionResult),
);

export { router as questionRoutes };
