import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { config } from "@/config/config";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevQuest API",
      version: "1.0.0",
      description:
        "Backend API para plataforma gamificada de aprendizagem DevQuest - Sistema de quizzes com XP, níveis e progresso por módulos.",
      contact: {
        name: "DevQuest Team",
        email: "devquest@unifor.br",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.server.port}`,
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtido no login. Use: Bearer <token>",
        },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Indica se a requisição foi bem-sucedida",
            },
            data: {
              type: "object",
              description: "Dados da resposta (quando success = true)",
            },
            message: {
              type: "string",
              description: "Mensagem informativa",
            },
            error: {
              type: "string",
              description: "Mensagem de erro (quando success = false)",
            },
          },
          required: ["success"],
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            displayName: {
              type: "string",
              description: "Nome de exibição do usuário",
            },
            xp: {
              type: "integer",
              minimum: 0,
              description: "Pontos de experiência do usuário",
            },
            level: {
              type: "integer",
              minimum: 1,
              description: "Nível atual do usuário",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "displayName", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "usuario@exemplo.com",
            },
            displayName: {
              type: "string",
              minLength: 2,
              example: "João Silva",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "minhasenha123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "test@devquest.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            user: {
              $ref: "#/components/schemas/User",
            },
            token: {
              type: "string",
              description: "Token JWT para autenticação",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "🔐 Endpoints de autenticação e autorização",
      },
      {
        name: "Users",
        description: "👤 Gerenciamento de usuários e progresso",
      },
      {
        name: "Modules",
        description: "📚 Módulos de aprendizagem",
      },
      {
        name: "Questions",
        description: "❓ Questões e respostas",
      },
      {
        name: "Progress",
        description: "📊 Progresso e completude dos módulos",
      },
      {
        name: "XP",
        description: "💎 Sistema de experiência e níveis",
      },
      {
        name: "Ratings",
        description: "⭐ Avaliações dos módulos",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.get("/api-docs-json", (req, res) => {
    res.json(specs);
  });
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    `,
      customSiteTitle: "DevQuest API Documentation",
      customfavIcon: "/favicon.ico",
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  console.log(
    `📖 API Documentation: http://localhost:${config.server.port}/api-docs`,
  );
}
