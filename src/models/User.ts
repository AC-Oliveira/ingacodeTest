import { PrismaClient, Users } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser extends Users {}

const createUser = async (username: string, password: string) => {
  prisma.$connect();
  const user: IUser = await prisma.users.create({
    data: {
      Username: username,
      Password: password,
    },
  });
  prisma.$disconnect();

  return user;
};

const createCollaborator = async (id: string, name: string) => {
  prisma.$connect();
  const collaborator = await prisma.collaborators.create({
    data: {
      Name: name,
      Id: id,
    },
  });
  prisma.$disconnect();

  return collaborator;
};

const findUserByUsername = async (username: string) => {
  prisma.$connect();
  const user: IUser | null = await prisma.users.findUnique({
    where: {
      Username: username,
    },
  });
  prisma.$disconnect();

  return user;
};

const findUserById = async (id: string) => {
  prisma.$connect();
  const user: IUser | null = await prisma.users.findUnique({
    where: {
      Id: id,
    },
  });
  prisma.$disconnect();

  return user;
};

const findCollaboratorsByName = async (word: string) => {
  prisma.$connect();
  const collaborator = await prisma.collaborators.findMany({
    where: {
      Name: { contains: word },
    },
  });
  prisma.$disconnect();

  return collaborator;
};

const findAllUsers = async () => {
  prisma.$connect();
  const users = await prisma.users.findMany();
  prisma.$disconnect();

  return users;
};

const findAllCollaborators = async () => {
  prisma.$connect();
  const collaborators = await prisma.collaborators.findMany();
  prisma.$disconnect();

  return collaborators;
};

const updateUser = async (username: string, password: string) => {
  prisma.$connect();
  const user = await prisma.users.update({
    where: {
      Username: username,
    },
    data: {
      Password: password,
      Username: username,
      UpdatedAt: new Date(),
    },
  });
  prisma.$disconnect();

  return user;
};

export default {
  createUser,
  createCollaborator,
  findUserByUsername,
  findUserById,
  findCollaboratorsByName,
  findAllUsers,
  findAllCollaborators,
  updateUser,
};
