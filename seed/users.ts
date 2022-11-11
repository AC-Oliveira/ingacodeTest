import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const passwordGenerator = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export async function main(): Promise<void> {
  const prisma = new PrismaClient();
  prisma.$connect();

  await prisma.users.createMany({
    data: [
      {
        Username: 'outrageous',
        Password: await passwordGenerator('outrageous1234'),
      },
      {
        Username: 'hawk',
        Password: await passwordGenerator('hawk1234'),
      },
      {
        Username: 'jimmy',
        Password: await passwordGenerator('jimmy1234'),
      },
      {
        Username: 'reader',
        Password: await passwordGenerator('reader1234'),
      },
    ],
  });

  prisma.$disconnect();
}

main();
