import { Router } from "express";
import { xpController } from "@/controllers/xp.controller";
import { authenticateToken } from "@/middlewares/auth";

const router = Router();

// All XP routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/xp/add:
 *   post:
 *     tags: [XP]
 *     summary: 💎 Adicionar XP manualmente
 *     description: Adiciona XP ao usuário com razão específica (para testes ou eventos especiais)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, reason]
 *             properties:
 *               amount:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10000
 *                 description: Quantidade de XP a ser adicionada
 *               reason:
 *                 type: string
 *                 minLength: 1
 *                 description: Razão para adicionar XP
 *               moduleId:
 *                 type: string
 *                 format: uuid
 *                 description: ID do módulo relacionado (opcional)
 *           examples:
 *             bonusXP:
 *               summary: 🎁 Bônus especial
 *               value:
 *                 amount: 100
 *                 reason: "bonus_event"
 *             moduleBonus:
 *               summary: 📚 Bônus por módulo
 *               value:
 *                 amount: 50
 *                 reason: "extra_credit"
 *                 moduleId: "cm123456789"
 *             testReward:
 *               summary: 🧪 Recompensa de teste
 *               value:
 *                 amount: 25
 *                 reason: "testing_reward"
 *     responses:
 *       200:
 *         description: ✅ XP adicionado com sucesso
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
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             xp:
 *                               type: integer
 *                               description: XP total atual
 *                             level:
 *                               type: integer
 *                               description: Nível atual
 *                         xpGained:
 *                           type: integer
 *                           description: XP total ganho (incluindo bônus de level up)
 *                         leveledUp:
 *                           type: boolean
 *                           description: Se subiu de nível
 *                         oldLevel:
 *                           type: integer
 *                           description: Nível anterior
 *                         newLevel:
 *                           type: integer
 *                           description: Novo nível
 *             examples:
 *               levelUp:
 *                 summary: 🎉 Subiu de nível
 *                 value:
 *                   success: true
 *                   data:
 *                     user:
 *                       id: "cm123456789"
 *                       xp: 250
 *                       level: 3
 *                     xpGained: 150
 *                     leveledUp: true
 *                     oldLevel: 2
 *                     newLevel: 3
 *                   message: "Gained 100 XP and leveled up to level 3!"
 *               noLevelUp:
 *                 summary: 💎 Apenas XP
 *                 value:
 *                   success: true
 *                   data:
 *                     user:
 *                       id: "cm123456789"
 *                       xp: 175
 *                       level: 2
 *                     xpGained: 25
 *                     leveledUp: false
 *                     oldLevel: 2
 *                     newLevel: 2
 *                   message: "Gained 25 XP"
 *       401:
 *         description: ❌ Não autenticado
 *       404:
 *         description: ❌ Módulo não encontrado (se moduleId fornecido)
 *       400:
 *         description: ❌ Dados inválidos
 */
router.post("/add", xpController.addXP);

/**
 * @swagger
 * /api/xp/history:
 *   get:
 *     tags: [XP]
 *     summary: 📜 Histórico de XP paginado
 *     description: Retorna histórico paginado das transações de XP do usuário
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página (padrão: 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Itens por página (padrão: 20, máx: 100)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *           example: 10
 *     responses:
 *       200:
 *         description: ✅ Histórico de XP
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
 *                         transactions:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               amount:
 *                                 type: integer
 *                                 description: Quantidade de XP (pode ser negativo)
 *                               reason:
 *                                 type: string
 *                                 description: Razão da transação
 *                               module:
 *                                 nullable: true
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                   title:
 *                                     type: string
 *                                   slug:
 *                                     type: string
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         pages:
 *                           type: integer
 *                         hasNext:
 *                           type: boolean
 *                         hasPrev:
 *                           type: boolean
 *             example:
 *               success: true
 *               data:
 *                 transactions:
 *                   - id: "cm987654321"
 *                     amount: 60
 *                     reason: "quiz_completion"
 *                     module:
 *                       id: "cm123456789"
 *                       title: "Fundamentos de Ciência de Dados e Python"
 *                       slug: "fundamentos"
 *                     createdAt: "2024-01-15T10:30:00Z"
 *                   - id: "cm987654322"
 *                     amount: 50
 *                     reason: "level_up_bonus"
 *                     module: null
 *                     createdAt: "2024-01-15T10:31:00Z"
 *                   - id: "cm987654323"
 *                     amount: 100
 *                     reason: "bonus_event"
 *                     module: null
 *                     createdAt: "2024-01-15T11:00:00Z"
 *               pagination:
 *                 page: 1
 *                 limit: 20
 *                 total: 15
 *                 pages: 1
 *                 hasNext: false
 *                 hasPrev: false
 *       401:
 *         description: ❌ Não autenticado
 */
router.get("/history", xpController.getXPHistory);

export { router as xpRoutes };
