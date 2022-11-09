import { PrismaClient } from '@prisma/client';

export async function main(): Promise<void> {
  const prisma = new PrismaClient();
  prisma.$connect();

  const usersNames = ['outrageous', 'hawk', 'jimmy', 'reader'];
  const users = await prisma.users.findMany({
    where: {
      Username: {
        in: usersNames,
      },
    },
  });

  users.forEach(async (user) => {
    const colaborators = await prisma.colaborators.create({
      data: {
        Id: user.Id,
        Name: `Name ${user.Username}`,
      },
    });
  });

  prisma.$disconnect();
}
