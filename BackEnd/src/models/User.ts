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

const findCollaboratorsByName = async (word: string) => {
  prisma.$connect();
  const collaborator = await prisma.collaborators.findMany({
    where: {
      Name: { contains: word },
    },
    take: 5,
    select: {
      Name: true,
      Id: true,
    },
  });
  prisma.$disconnect();

  return collaborator;
};

const findAllUsers = async () => {
  prisma.$connect();
  const users = await prisma.users.findMany({
    select: {
      Username: true,
      Id: true,
    },
  });
  prisma.$disconnect();

  return users;
};

const findAllCollaborators = async () => {
  prisma.$connect();
  const collaborators = await prisma.collaborators.findMany({
    select: {
      Name: true,
      Id: true,
    },
  });
  prisma.$disconnect();

  return collaborators;
};

const findCollaboratorById = async (Id: string) => {
  prisma.$connect();
  const collaborator = await prisma.collaborators.findUnique({
    where: {
      Id,
    },
  });
  prisma.$disconnect();

  return collaborator;
};

export default {
  createUser,
  createCollaborator,
  findUserByUsername,
  findCollaboratorsByName,
  findAllUsers,
  findAllCollaborators,
  findCollaboratorById,
};
