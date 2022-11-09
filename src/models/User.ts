import { PrismaClient } from '@prisma/client';

interface IUser {
  Id: string;
  Username: string;
  Password: string;
  CreatedAt: Date;
  UpdatedAt: Date | null;
  DeletedAt: Date | null;
}

const findUserByUsername = async (username: string) => {
  const prisma = new PrismaClient();
  const user: IUser | null = await prisma.users.findUnique({
    where: {
      Username: username,
    },
  });
  return user;
};

export default {
  findUserByUsername,
};
