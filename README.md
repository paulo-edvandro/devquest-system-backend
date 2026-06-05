# DevQuest Backend

Backend API para plataforma gamificada de aprendizagem DevQuest - Sistema de quizzes com XP, níveis e progresso por módulos.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma ORM** - Object-Relational Mapping
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

## 📁 Estrutura do Projeto



```
src/
├── config/         # Configurações da aplicação
├── controllers/    # Controladores das rotas
├── services/       # Lógica de negócio (opcional)
├── routes/         # Definição das rotas
├── middlewares/    # Middlewares customizados
├── lib/            # Bibliotecas (Prisma client, etc)
├── utils/          # Funções utilitárias
├── types/          # Definições de tipos TypeScript
└── server.ts       # Arquivo principal do servidor

prisma/
├── schema.prisma   # Schema do banco de dados
└── seed.ts         # Script para popular dados iniciais
```

## 🗃️ Entidades Principais

- **User** - Usuários da plataforma
- **Module** - Módulos de aprendizagem
- **ModuleProgress** - Progresso do usuário nos módulos
- **Question** - Questões dos quizzes
- **UserAnswer** - Respostas dos usuários
- **Rating** - Avaliações dos módulos
- **Video** - Vídeos dos módulos
- **PDFMaterial** - Materiais em PDF
- **XPTransaction** - Histórico de transações de XP

## 🔗 Principais Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil do usuário autenticado

### Usuário
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/progress` - Progresso do usuário
- `GET /api/users/xp-history` - Histórico de XP

### Módulos
- `GET /api/modules` - Lista todos os módulos
- `GET /api/modules/:slug` - Detalhes de um módulo
- `GET /api/modules/:slug/questions` - Questões do módulo
- `GET /api/modules/:slug/videos` - Vídeos do módulo
- `GET /api/modules/:slug/materials` - Materiais do módulo

### Progresso e XP
- `POST /api/progress/complete-module` - Completar módulo
- `POST /api/xp/add` - Adicionar XP
- `GET /api/xp/history` - Histórico de XP

### Questões
- `POST /api/questions/answer` - Responder questão
- `GET /api/questions/:id/result` - Resultado da questão

### Avaliações
- `POST /api/ratings` - Criar avaliação
- `GET /api/ratings/stats/:moduleId` - Estatísticas de avaliação

## 🛠️ Setup e Instalação

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `environment.example` para `.env` e configure:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/devquest_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
```

### 3. Configurar Banco de Dados
```bash
# Gerar client do Prisma
npm run db:generate

# Executar migrations
npm run db:migrate

# Popular dados iniciais
npm run db:seed
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```

### 5. Scripts Disponíveis
```bash
npm run dev           # Desenvolvimento com hot reload
npm run build         # Build para produção
npm run start         # Executar build de produção
npm run db:migrate    # Executar migrations
npm run db:seed       # Popular dados iniciais
npm run db:reset      # Reset completo do banco
npm run db:generate   # Gerar client Prisma
npm run db:studio     # Abrir Prisma Studio
```

## 📊 Sistema de XP e Níveis

- **XP por resposta correta**: 20 XP
- **XP por nível**: 100 XP
- **Bônus de level up**: 50 XP
- **Cálculo de nível**: `Math.floor(totalXP / 100) + 1`

## 🔐 Autenticação

O sistema utiliza JWT para autenticação. Inclua o token no header:
```
Authorization: Bearer <seu-token-jwt>
```

## 📝 Dados de Teste

Após executar `npm run db:seed`, você terá:
- **Usuário teste**: `test@devquest.com` / `123456`
- **4 módulos** com questões, vídeos e materiais
- **Progresso parcial** no usuário teste
- **Avaliações e transações de XP**

## 🌐 CORS

Configurado para aceitar requisições do frontend React em `http://localhost:3000`. Altere a variável `CORS_ORIGIN` conforme necessário.

## 📚 Documentação da API

Todas as rotas retornam respostas no formato:
```json
{
  "success": true|false,
  "data": {...},
  "message": "...",
  "error": "..." // apenas em caso de erro
}
```

Para rotas paginadas:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔧 Desenvolvimento

### Estrutura Recomendada para Novos Recursos

1. **Definir tipos** em `src/types/`
2. **Criar validações** em `src/utils/validation.ts`
3. **Implementar service** (opcional) em `src/services/`
4. **Criar controller** em `src/controllers/`
5. **Definir rotas** em `src/routes/`
6. **Registrar rotas** em `src/server.ts`

### Padrões de Código

- Use **TypeScript** para tipagem forte
- Valide dados com **Zod**
- Trate erros com middleware personalizado
- Mantenha controllers simples e delegue lógica complexa para services
- Use transações do Prisma para operações críticas

## 🚨 Produção

Para deploy em produção:

1. Configure variáveis de ambiente adequadas
2. Execute `npm run build`
3. Configure proxy reverso (Nginx)
4. Configure SSL/TLS
5. Use ferramentas de monitoramento
6. Configure logs adequados

---

## 📞 Suporte

Este é um projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Web. Para dúvidas sobre implementação, consulte a documentação do Prisma, Express e TypeScript.