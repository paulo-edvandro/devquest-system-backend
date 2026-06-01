import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { moduleContent, ModuleContentSeed } from './moduleContent';

const prisma = new PrismaClient();

async function syncQuestions(moduleId: string, content: ModuleContentSeed) {
  const existingQuestions = await prisma.question.findMany({
    where: { moduleId },
    orderBy: { order: 'asc' },
  });

  for (const question of content.questions) {
    const existingQuestion = existingQuestions.find(
      (item) => item.order === question.order,
    );

    if (existingQuestion) {
      await prisma.question.update({
        where: { id: existingQuestion.id },
        data: {
          text: question.text,
          options: question.options,
          correctIndex: question.correctIndex,
          explanation: question.explanation,
          isActive: true,
        },
      });
    } else {
      await prisma.question.create({
        data: {
          moduleId,
          text: question.text,
          options: question.options,
          correctIndex: question.correctIndex,
          explanation: question.explanation,
          order: question.order,
        },
      });
    }
  }

  const validOrders = content.questions.map((question) => question.order);
  await prisma.question.updateMany({
    where: {
      moduleId,
      order: { notIn: validOrders },
    },
    data: { isActive: false },
  });
}

async function syncVideos(moduleId: string, content: ModuleContentSeed) {
  const existingVideos = await prisma.video.findMany({
    where: { moduleId },
    orderBy: { order: 'asc' },
  });

  for (const video of content.videos) {
    const existingVideo = existingVideos.find((item) => item.order === video.order);

    if (existingVideo) {
      await prisma.video.update({
        where: { id: existingVideo.id },
        data: {
          title: video.title,
          videoId: video.videoId,
          code: video.code ?? null,
          language: video.language ?? 'python',
        },
      });
    } else {
      await prisma.video.create({
        data: {
          moduleId,
          title: video.title,
          videoId: video.videoId,
          code: video.code,
          language: video.language ?? 'python',
          order: video.order,
        },
      });
    }
  }

  const validOrders = content.videos.map((video) => video.order);
  await prisma.video.deleteMany({
    where: {
      moduleId,
      order: { notIn: validOrders.length ? validOrders : [-1] },
    },
  });
}

async function syncPDFMaterials(moduleId: string, content: ModuleContentSeed) {
  const existingMaterials = await prisma.pDFMaterial.findMany({
    where: { moduleId },
    orderBy: { order: 'asc' },
  });

  for (const material of content.pdfMaterials) {
    const existingMaterial = existingMaterials.find(
      (item) => item.order === material.order,
    );

    if (existingMaterial) {
      await prisma.pDFMaterial.update({
        where: { id: existingMaterial.id },
        data: {
          name: material.name,
          description: material.description,
          url: material.url,
          filename: material.filename,
          isActive: true,
        },
      });
    } else {
      await prisma.pDFMaterial.create({
        data: {
          moduleId,
          name: material.name,
          description: material.description,
          url: material.url,
          filename: material.filename,
          order: material.order,
        },
      });
    }
  }

  const validOrders = content.pdfMaterials.map((material) => material.order);
  await prisma.pDFMaterial.updateMany({
    where: {
      moduleId,
      order: { notIn: validOrders },
    },
    data: { isActive: false },
  });
}

async function syncModule(content: ModuleContentSeed) {
  const existingModule = await prisma.module.findFirst({
    where: {
      OR: [{ slug: content.slug }, { order: content.order }],
    },
  });

  const module = existingModule
    ? await prisma.module.update({
        where: { id: existingModule.id },
        data: {
          slug: content.slug,
          title: content.title,
          description: content.description,
          emoji: content.emoji,
          order: content.order,
          isActive: true,
        },
      })
    : await prisma.module.create({
        data: {
          slug: content.slug,
          title: content.title,
          description: content.description,
          emoji: content.emoji,
          order: content.order,
          isActive: true,
        },
      });

  await syncQuestions(module.id, content);
  await syncVideos(module.id, content);
  await syncPDFMaterials(module.id, content);

  return module;
}

async function syncDemoUser() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  return prisma.user.upsert({
    where: { email: 'test@devquest.com' },
    update: {
      displayName: 'Test User',
      passwordHash: hashedPassword,
    },
    create: {
      email: 'test@devquest.com',
      displayName: 'Test User',
      passwordHash: hashedPassword,
      xp: 0,
      level: 1,
    },
  });
}

async function main() {
  console.log('Starting database content sync...');

  const modules = [];

  for (const content of moduleContent) {
    const module = await syncModule(content);
    modules.push(module);
    console.log(`Synced module: ${module.title}`);
  }

  const user = await syncDemoUser();
  console.log(`Demo user ready: ${user.email}`);

  console.log('\nDatabase content sync completed.');
  console.log(`Modules: ${modules.length}`);
  console.log(`Questions: ${moduleContent.reduce((total, item) => total + item.questions.length, 0)}`);
  console.log(`Videos: ${moduleContent.reduce((total, item) => total + item.videos.length, 0)}`);
  console.log(`PDF Materials: ${moduleContent.reduce((total, item) => total + item.pdfMaterials.length, 0)}`);
}

main()
  .catch((error) => {
    console.error('Error during database content sync:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
