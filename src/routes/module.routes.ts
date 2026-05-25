import { Router } from "express";
import { moduleController } from "@/controllers/module.controller";
import { optionalAuth } from "@/middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/modules:
 *   get:
 *     tags: [Modules]
 *     summary: 📚 Listar todos os módulos
 *     description: Retorna lista de módulos com progresso (se autenticado)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Lista de módulos
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "cm123456789"
 *                   slug: "fundamentos"
 *                   title: "Fundamentos de Ciência de Dados e Python"
 *                   emoji: "🐍"
 *                   order: 1
 *                   _count:
 *                     questions: 3
 *                     videos: 1
 */
router.get("/", optionalAuth, moduleController.getModules);

/**
 * @swagger
 * /api/modules/{slug}:
 *   get:
 *     tags: [Modules]
 *     summary: 📚 Obter módulo por slug
 *     description: Retorna detalhes completos de um módulo
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug do módulo
 *         schema:
 *           type: string
 *           enum: [fundamentos, pandas, exploracao, visualizacao]
 *           example: "pandas"
 *     responses:
 *       200:
 *         description: ✅ Detalhes do módulo
 *       404:
 *         description: ❌ Módulo não encontrado
 */
router.get("/:slug", optionalAuth, moduleController.getModuleBySlug);

/**
 * @swagger
 * /api/modules/{slug}/questions:
 *   get:
 *     tags: [Modules]
 *     summary: ❓ Questões do módulo
 *     description: Lista questões sem revelar respostas corretas
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *           example: "fundamentos"
 *     responses:
 *       200:
 *         description: ✅ Questões do módulo
 */
router.get(
  "/:slug/questions",
  optionalAuth,
  moduleController.getModuleQuestions,
);

/**
 * @swagger
 * /api/modules/{slug}/videos:
 *   get:
 *     tags: [Modules]
 *     summary: 🎥 Vídeos do módulo
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ Vídeos do módulo
 */
router.get("/:slug/videos", optionalAuth, moduleController.getModuleVideos);

/**
 * @swagger
 * /api/modules/{slug}/materials:
 *   get:
 *     tags: [Modules]
 *     summary: 📄 Materiais PDF
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ Materiais do módulo
 */
router.get(
  "/:slug/materials",
  optionalAuth,
  moduleController.getModuleMaterials,
);

export { router as moduleRoutes };
