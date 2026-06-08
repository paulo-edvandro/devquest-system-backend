# DevQuest Backend

API REST para a plataforma DevQuest, que entrega módulos, quizzes, materiais, progresso e XP.

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** para autenticação
- **bcryptjs** para hash de senha
- **Zod** para validação
- **Helmet / CORS / express-rate-limit** para segurança

## 📁 Estrutura do projeto

```
DevQuest/devquest-back/
├── prisma/
│   ├── schema.prisma       # Modelo de dados e schema do banco
│   └── seed.ts             # Popula módulos, perguntas, vídeos, PDFs e usuário demo
├── src/
│   ├── config/             # Configurações e leitura de ambiente
│   ├── controllers/        # Lógica das rotas
│   ├── routes/             # Endpoints da API
│   ├── middlewares/        # Autenticação, erros e logs
│   ├── lib/                # Prisma client e conteúdo inicial do seed
│   ├── types/              # Tipos TypeScript
│   ├── utils/              # Helpers e validações
│   └── server.ts           # Inicialização do servidor
└── package.json
```

## 🧠 Como funciona

- `src/server.ts` cria o servidor Express e registra middleware e rotas.
- `src/routes/` define os endpoints da API.
- `src/controllers/` contém a lógica executada por cada rota.
- `src/lib/prisma.ts` é o cliente Prisma para acessar o banco.
- `src/lib/moduleContent.ts` define o conteúdo inicial de módulos, vídeos e PDFs.
- `src/lib/seed.ts` injeta esses dados no banco e cria o usuário demo.
- Os arquivos PDF reais estão no frontend; o backend salva apenas as referências (`url`, `videoId`, `filename`).

## 🔗 Endpoints principais

### Autenticação
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Usuário
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/progress`
- `GET /api/users/xp-history`

### Módulos
- `GET /api/modules`
- `GET /api/modules/:slug`
- `GET /api/modules/:slug/questions`
- `GET /api/modules/:slug/videos`
- `GET /api/modules/:slug/materials`

### Progresso
- `POST /api/progress/complete-module`

### Questões
- `POST /api/questions/answer`
- `GET /api/questions/:id/result`

### Avaliações
- `POST /api/ratings`
- `GET /api/ratings/stats/:moduleId`

### XP
- `POST /api/xp/add`
- `GET /api/xp/history`

## 🛠️ Configuração de ambiente

Crie um arquivo `.env` na pasta `DevQuest/devquest-back/` com:

```env
DATABASE_URL="postgresql://postgres:12345678@localhost:5433/devquest_db?schema=public"
JWT_SECRET="g9B$2mK#pL9!xZ4@vW7*qY1_eR8%tU3"
JWT_EXPIRES_IN="7d"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
NODE_ENV="development"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
```

## 🚀 Passo a passo

1. Acesse a pasta do backend:

```bash
cd DevQuest/devquest-back
```

2. Instale dependências:

```bash
npm install
```

3. Gere o client Prisma:

```bash
npm run db:generate
```

4. Rode migrations e popule dados:

```bash
npm run db:migrate
npm run db:seed
```

5. Inicie o servidor:

```bash
npm run dev
```

6. Abra a API em:

```text
http://localhost:3001
```

7. Acesse a documentação Swagger em:

```text
http://localhost:3001/api-docs
```

## ✅ Usuário de teste

- Email: `test@devquest.com`
- Senha: `123456`

## 🔐 Autenticação

Envie o token JWT no header:

```http
Authorization: Bearer <token>
```

## 📌 Observações

- O backend salva apenas metadados e referências de vídeos/PDFs.
- Os PDFs reais ficam no frontend em `devquest-front/public/assets/`.
- Os vídeos são identificados por `videoId` e podem ser links externos.

## 📦 Scripts

```bash
npm run dev
npm run build
npm run start
npm run db:migrate
npm run db:seed
npm run db:reset
npm run db:generate
npm run db:studio
```

## 💡 Visão geral para apresentação

O backend faz:

- autenticação de usuários
- listagem de módulos
- fornecimento de vídeos e PDFs
- envio e avaliação de respostas
- contabilização de XP e nível
- gravação do progresso do usuário

O frontend consome essa API para montar a experiência completa.
