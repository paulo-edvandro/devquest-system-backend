import { Router } from "express";
import { authController } from "@/controllers/auth.controller";
import { authenticateToken } from "@/middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: 👤 Registrar novo usuário
 *     description: Cria uma nova conta de usuário na plataforma DevQuest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           examples:
 *             newUser:
 *               summary: Novo usuário
 *               value:
 *                 email: "usuario@exemplo.com"
 *                 displayName: "João Silva"
 *                 password: "minhasenha123"
 *     responses:
 *       201:
 *         description: ✅ Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   id: "cm123456789"
 *                   email: "usuario@exemplo.com"
 *                   displayName: "João Silva"
 *                   xp: 0
 *                   level: 1
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               message: "User registered successfully"
 *       409:
 *         description: ❌ Email já está em uso
 *       400:
 *         description: ❌ Dados inválidos (validação falhou)
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: 🔑 Fazer login
 *     description: Autentica usuário e retorna token JWT para acesso às rotas protegidas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             testUser:
 *               summary: 🧪 Usuário de teste (seed)
 *               value:
 *                 email: "test@devquest.com"
 *                 password: "123456"
 *             customUser:
 *               summary: Usuário personalizado
 *               value:
 *                 email: "seu@email.com"
 *                 password: "suasenha"
 *     responses:
 *       200:
 *         description: ✅ Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   id: "cm123456789"
 *                   email: "test@devquest.com"
 *                   displayName: "Test User"
 *                   xp: 150
 *                   level: 2
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               message: "Login successful"
 *       401:
 *         description: ❌ Email ou senha incorretos
 *       400:
 *         description: ❌ Dados inválidos
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: 👤 Obter perfil do usuário logado
 *     description: Retorna informações completas do usuário autenticado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               data:
 *                 id: "cm123456789"
 *                 email: "test@devquest.com"
 *                 displayName: "Test User"
 *                 xp: 150
 *                 level: 2
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T15:45:00Z"
 *       401:
 *         description: ❌ Token inválido ou expirado
 */
router.get("/me", authenticateToken, authController.getProfile);

export { router as authRoutes };
