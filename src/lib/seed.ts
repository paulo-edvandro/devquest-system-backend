import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🧹 Cleaning existing data...');
  await prisma.xPTransaction.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.userAnswer.deleteMany({});
  await prisma.moduleProgress.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.pDFMaterial.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.user.deleteMany({});

  // Create test user
  console.log('👤 Creating test user...');
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@devquest.com',
      displayName: 'Test User',
      passwordHash: hashedPassword,
      xp: 170,
      level: 2,
    },
  });

  console.log(`✅ Created test user: ${user.email}`);

  // Create modules
  const modulesData = [
    {
      slug: 'fundamentos',
      title: 'Fundamentos de Ciência de Dados e Python',
      description: 'Introdução ao ciclo de vida dos dados, tipos de variáveis e os primeiros passos com Python para análise.',
      emoji: '🐍',
      order: 1,
    },
    {
      slug: 'pandas',
      title: 'Python para Ciência de Dados (Pandas)',
      description: 'Exemplos práticos de manipulação de dados com Pandas: filtros, agrupamentos e exportação.',
      emoji: '🐼',
      order: 2,
    },
    {
      slug: 'exploracao',
      title: 'Exploração de Dados e Estatística',
      description: 'Técnicas de análise exploratória e conceitos estatísticos fundamentais.',
      emoji: '🔍',
      order: 3,
    },
    {
      slug: 'visualizacao',
      title: 'Visualização de Dados',
      description: 'Criação de gráficos e visualizações eficazes para comunicar insights dos dados.',
      emoji: '📊',
      order: 4,
    },
  ];

  console.log('📚 Creating modules...');
  const createdModules = [];

  for (const moduleData of modulesData) {
    const module = await prisma.module.create({
      data: moduleData,
    });

    createdModules.push(module);
    console.log(`   ✅ ${module.title}`);

    // Create sample questions for each module
    console.log(`      📝 Creating questions...`);
    const questionsData = [
      {
        text: `Qual biblioteca Python é mais usada para manipulação de dados tabulares?`,
        options: ['NumPy', 'Matplotlib', 'Pandas', 'Scikit-learn'],
        correctIndex: 2,
        explanation: 'Pandas é a biblioteca padrão para manipulação de DataFrames e Series, oferecendo funções de filtro, agrupamento, leitura de CSV/Excel, entre muitas outras.',
        order: 1,
        moduleId: module.id,
      },
      {
        text: `Qual das opções NÃO é uma etapa do ciclo de vida dos dados?`,
        options: ['Coleta', 'Limpeza', 'Compilação', 'Modelagem'],
        correctIndex: 2,
        explanation: 'Compilação é um processo de programação de baixo nível, não uma etapa do pipeline de Ciência de Dados. As etapas corretas são: Coleta, Limpeza, Exploração, Modelagem, Visualização e Implantação.',
        order: 2,
        moduleId: module.id,
      },
      {
        text: `O que a função describe() do Pandas retorna?`,
        options: [
          'O tipo de cada coluna',
          'Estatísticas descritivas (média, desvio, min, max etc.)',
          'Os primeiros 5 registros do DataFrame',
          'O número de valores nulos',
        ],
        correctIndex: 1,
        explanation: 'df.describe() retorna um resumo estatístico com count, mean, std, min, 25%, 50%, 75% e max para colunas numéricas — ideal para uma visão geral rápida dos dados.',
        order: 3,
        moduleId: module.id,
      },
    ];

    for (const questionData of questionsData) {
      await prisma.question.create({
        data: questionData,
      });
    }

    // Create sample video for each module
    console.log(`      🎥 Creating video...`);
    await prisma.video.create({
      data: {
        moduleId: module.id,
        title: `Aula: ${module.title}`,
        videoId: 'yhp6rgrCjQ0', // Real educational video ID
        code: `# ${module.title}
import pandas as pd
import numpy as np

# Exemplo prático
dados = pd.Series([23, 45, 12, 67, 34, 89, 55, 41])

print("Média:   ", dados.mean())
print("Mediana: ", dados.median())
print("Desvio:  ", round(dados.std(), 2))
print("Min/Max: ", dados.min(), "/", dados.max())`,
        language: 'python',
        order: 1,
      },
    });

    // Create sample PDF materials for each module
    console.log(`      📄 Creating PDF materials...`);
    const pdfMaterials = [
      {
        moduleId: module.id,
        name: `Slides: ${module.title}`,
        description: 'PDF com todos os slides da aula',
        url: `/assets/${module.slug}-slides.pdf`,
        filename: `${module.slug}-slides.pdf`,
        order: 1,
      },
      {
        moduleId: module.id,
        name: `Resumo: ${module.title}`,
        description: 'Guia rápido de referência',
        url: `/assets/${module.slug}-resumo.pdf`,
        filename: `${module.slug}-resumo.pdf`,
        order: 2,
      },
    ];

    for (const pdfData of pdfMaterials) {
      await prisma.pDFMaterial.create({
        data: pdfData,
      });
    }

    // Create module progress for test user
    console.log(`      📊 Creating progress...`);
    const isCompleted = module.order <= 2; // First 2 modules completed
    const score = isCompleted ? 3 : 0; // 3 out of 3 questions correct
    const gainedXP = isCompleted ? score * 20 : 0; // 20 XP per correct answer

    await prisma.moduleProgress.create({
      data: {
        userId: user.id,
        moduleId: module.id,
        completed: isCompleted,
        score: score,
        gainedXP: gainedXP,
        attempts: isCompleted ? 1 : 0,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // Create XP transactions for completed modules
    if (isCompleted) {
      console.log(`      💎 Creating XP transaction...`);
      await prisma.xPTransaction.create({
        data: {
          userId: user.id,
          moduleId: module.id,
          amount: gainedXP,
          reason: 'quiz_completion',
        },
      });
    }

    // Create sample rating for completed modules
    if (isCompleted) {
      console.log(`      ⭐ Creating rating...`);
      await prisma.rating.create({
        data: {
          userId: user.id,
          moduleId: module.id,
          stars: module.order === 1 ? 5 : 4,
          clarity: 'Sim',
          organized: 'Sim',
          difficulty: module.order === 1 ? 'Médio' : 'Fácil',
          feedback: module.order === 1 
            ? 'Excelente módulo! Muito bem explicado e organizado.' 
            : 'Bom módulo, mas poderia ter mais exemplos práticos.',
        },
      });
    }
  }

  // Create level up XP transaction for test user
  console.log('🎉 Creating level up bonus...');
  await prisma.xPTransaction.create({
    data: {
      userId: user.id,
      amount: 50,
      reason: 'level_up_bonus',
    },
  });

  // Create some sample user answers for completed modules
  console.log('✏️ Creating sample answers...');
  const completedModules = createdModules.slice(0, 2); // First 2 modules
  
  for (const module of completedModules) {
    const questions = await prisma.question.findMany({
      where: { moduleId: module.id },
      orderBy: { order: 'asc' },
    });

    for (const question of questions) {
      await prisma.userAnswer.create({
        data: {
          userId: user.id,
          questionId: question.id,
          selectedIndex: question.correctIndex, // All correct answers
          isCorrect: true,
        },
      });
    }
  }

  console.log('\n✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   👤 Users: 1`);
  console.log(`   📚 Modules: ${createdModules.length}`);
  console.log(`   📝 Questions: ${createdModules.length * 3}`);
  console.log(`   🎥 Videos: ${createdModules.length}`);
  console.log(`   📄 PDF Materials: ${createdModules.length * 2}`);
  console.log(`   📊 Progress entries: ${createdModules.length}`);
  console.log(`   💎 XP Transactions: 3`);
  console.log(`   ⭐ Ratings: 2`);
  console.log(`   ✏️ User Answers: 6`);
  console.log('\n🎮 Test Login:');
  console.log(`   📧 Email: test@devquest.com`);
  console.log(`   🔑 Password: 123456`);
  console.log(`   💎 XP: 150`);
  console.log(`   🎯 Level: 2`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });