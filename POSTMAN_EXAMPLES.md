# 🚀 DevQuest API - Exemplos para Postman

## 📌 **Informações Gerais**

- **Base URL**: `http://localhost:3001`
- **Documentação Swagger**: `http://localhost:3001/api-docs`
- **Formato**: Todas as requisições retornam JSON no formato `{ success: boolean, data?: any, message?: string, error?: string }`

---

## 🔐 **1. AUTHENTICATION**

### 1.1 Registrar Usuário
```http
POST {{baseURL}}/api/auth/register
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "displayName": "João Silva",
  "password": "minhasenha123"
}
```

### 1.2 Login (Usuário de Teste)
```http
POST {{baseURL}}/api/auth/login
Content-Type: application/json

{
  "email": "test@devquest.com",
  "password": "123456"
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cm123456789",
      "email": "test@devquest.com",
      "displayName": "Test User",
      "xp": 150,
      "level": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### 1.3 Obter Perfil (Requer Token)
```http
GET {{baseURL}}/api/auth/me
Authorization: Bearer {{token}}
```

---

## 👤 **2. USERS**

### 2.1 Progresso do Usuário
```http
GET {{baseURL}}/api/users/progress
Authorization: Bearer {{token}}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "totalXP": 150,
    "level": 2,
    "xpInCurrentLevel": 50,
    "xpForNextLevel": 50,
    "completedModules": 2,
    "totalModules": 4,
    "moduleProgress": [
      {
        "moduleTitle": "Fundamentos de Ciência de Dados e Python",
        "moduleSlug": "fundamentos",
        "completed": true,
        "score": 3,
        "gainedXP": 60
      }
    ]
  }
}
```

### 2.2 Histórico de XP
```http
GET {{baseURL}}/api/users/xp-history
Authorization: Bearer {{token}}
```

### 2.3 Atualizar Perfil
```http
PUT {{baseURL}}/api/users/profile
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "displayName": "João Silva Santos"
}
```

---

## 📚 **3. MODULES**

### 3.1 Listar Todos os Módulos
```http
GET {{baseURL}}/api/modules
# Opcional: Authorization: Bearer {{token}}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm123456789",
      "slug": "fundamentos",
      "title": "Fundamentos de Ciência de Dados e Python",
      "description": "Introdução ao ciclo de vida dos dados...",
      "emoji": "🐍",
      "order": 1,
      "isActive": true,
      "_count": {
        "questions": 3,
        "videos": 1,
        "pdfMaterials": 2
      },
      "progress": {
        "completed": true,
        "score": 3,
        "gainedXP": 60
      }
    }
  ]
}
```

### 3.2 Obter Módulo por Slug
```http
GET {{baseURL}}/api/modules/pandas
# Opcional: Authorization: Bearer {{token}}
```

### 3.3 Questões do Módulo
```http
GET {{baseURL}}/api/modules/fundamentos/questions
```

**Resposta (sem respostas corretas):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm987654321",
      "text": "Qual biblioteca Python é mais usada para manipulação de dados tabulares?",
      "options": ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"],
      "order": 1
    }
  ]
}
```

### 3.4 Vídeos do Módulo
```http
GET {{baseURL}}/api/modules/pandas/videos
```

### 3.5 Materiais PDF do Módulo
```http
GET {{baseURL}}/api/modules/fundamentos/materials
```

---

## ❓ **4. QUESTIONS**

### 4.1 Responder Questão
```http
POST {{baseURL}}/api/questions/answer
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "questionId": "cm987654321",
  "selectedIndex": 2
}
```

**Resposta (Correta):**
```json
{
  "success": true,
  "data": {
    "questionId": "cm987654321",
    "isCorrect": true,
    "correctIndex": 2,
    "explanation": "Pandas é a biblioteca padrão para manipulação de DataFrames e Series...",
    "selectedIndex": 2
  },
  "message": "Correct answer!"
}
```

**Resposta (Incorreta):**
```json
{
  "success": true,
  "data": {
    "questionId": "cm987654321",
    "isCorrect": false,
    "correctIndex": 2,
    "explanation": "Pandas é a biblioteca padrão...",
    "selectedIndex": 0
  },
  "message": "Incorrect answer"
}
```

### 4.2 Resultado da Questão
```http
GET {{baseURL}}/api/questions/cm987654321/result
Authorization: Bearer {{token}}
```

---

## 📊 **5. PROGRESS**

### 5.1 Completar Módulo
```http
POST {{baseURL}}/api/progress/complete-module
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "moduleSlug": "pandas",
  "score": 3,
  "totalQuestions": 3
}
```

**Resposta (Primeira vez - Ganhou XP):**
```json
{
  "success": true,
  "data": {
    "moduleProgress": {
      "completed": true,
      "score": 3,
      "gainedXP": 60,
      "attempts": 1
    },
    "gainedXP": 60,
    "leveledUp": true
  },
  "message": "Module completed successfully"
}
```

**Resposta (Já completado - Sem XP):**
```json
{
  "success": true,
  "data": {
    "moduleProgress": {
      "completed": true,
      "score": 3,
      "gainedXP": 60,
      "attempts": 2
    },
    "gainedXP": 0,
    "leveledUp": false
  },
  "message": "Module progress updated"
}
```

---

## ⭐ **6. RATINGS**

### 6.1 Criar Avaliação
```http
POST {{baseURL}}/api/ratings
# Opcional: Authorization: Bearer {{token}}
Content-Type: application/json

{
  "moduleSlug": "fundamentos",
  "stars": 5,
  "clarity": "Sim",
  "organized": "Sim", 
  "difficulty": "Médio",
  "feedback": "Excelente módulo! Muito bem explicado."
}
```

### 6.2 Estatísticas de Avaliação
```http
GET {{baseURL}}/api/ratings/stats/cm123456789
```

---

## 🎯 **FLUXO COMPLETO DE TESTE**

### Passo 1: Fazer Login
1. Execute o login para obter o token
2. Copie o token da resposta

### Passo 2: Explorar Módulos
1. Liste todos os módulos
2. Veja detalhes de um módulo específico
3. Obtenha as questões de um módulo

### Passo 3: Responder Questões
1. Para cada questão, use POST `/api/questions/answer`
2. Anote quantas acertou

### Passo 4: Completar Módulo
1. Use POST `/api/progress/complete-module`
2. Veja se ganhou XP e subiu de nível

### Passo 5: Verificar Progresso
1. Consulte seu progresso: GET `/api/users/progress`
2. Veja histórico de XP: GET `/api/users/xp-history`

### Passo 6: Avaliar Módulo
1. Deixe uma avaliação: POST `/api/ratings`

---

## 🔧 **Configuração do Postman**

### Variáveis de Ambiente
Crie essas variáveis no Postman:
- `baseURL`: `http://localhost:3001`
- `token`: (cole aqui o token obtido no login)

### Headers Globais
Para requests autenticados, adicione:
- `Authorization`: `Bearer {{token}}`
- `Content-Type`: `application/json`

---

## 🚨 **Possíveis Erros**

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Access token required",
  "message": "Please provide an authentication token"
}
```
**Solução**: Inclua o header `Authorization: Bearer <token>`

### 404 Not Found
```json
{
  "success": false,
  "error": "Module not found"
}
```
**Solução**: Verifique se o slug do módulo está correto

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Email: Invalid email format"
}
```
**Solução**: Verifique se todos os campos obrigatórios estão presentes e corretos

---

## 📖 **Dados de Teste Disponíveis**

Após executar `npm run db:seed`, você terá:
- **Usuário**: `test@devquest.com` / `123456`
- **Módulos**: `fundamentos`, `pandas`, `exploracao`, `visualizacao`
- **Progress**: Primeiros 2 módulos já completados
- **XP**: 150 XP (nível 2)

Esses dados são perfeitos para testar todas as funcionalidades da API!