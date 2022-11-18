import { PrismaClient, Users } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser extends Users {}

const createUser = async (username: string, password: string) => {
  const user: IUser = await prisma.users.create({
    data: {
      Username: username,
      Password: password,
    },
  });
};

const createCollaborator = async (id: string, name: string) => {
  const collaborator = await prisma.collaborators.create({
    data: {
      Name: name,
      Id: id,
    },
  });
};

const findUserByUsername = async (username: string) => {
  const user: IUser | null = await prisma.users.findUnique({
    where: {
      Username: username,
    },
  });

  return user;
};

const findCollaboratorsByName = async (word: string) => {
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

  return collaborator;
};

const findAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      Username: true,
      Id: true,
    },
  });

  return users;
};

const findAllCollaborators = async () => {
  const collaborators = await prisma.collaborators.findMany({
    select: {
      Name: true,
      Id: true,
    },
  });

  return collaborators;
};

const findCollaboratorById = async (Id: string) => {
  const collaborator = await prisma.collaborators.findUnique({
    where: {
      Id,
    },
  });

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
