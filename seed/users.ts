import { PrismaClient } from '@prisma/client';

export async function main(): Promise<void> {
  const prisma = new PrismaClient();
  prisma.$connect();

  await prisma.users.createMany({
    data: [
      {
        Username: 'outrageous',
        Password: 'outrageous1234',
      },
      {
        Username: 'hawk',
        Password: 'hawk1234',
      },
      {
        Username: 'jimmy',
        Password: 'jimmy1234',
      },
      {
        Username: 'reader',
        Password: 'reader1234',
      },
    ],
  });

  prisma.$disconnect();
}
