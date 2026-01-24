import { PrismaClient } from '@prisma/client';

let prisma;

// Initialize Prisma Client with optimized settings
function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      // Log only errors and warnings in production
      log: process.env.NODE_ENV === 'production' 
        ? ['error', 'warn'] 
        : ['error', 'warn', 'query'],
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }

  return prisma;
}

export default getPrismaClient;
