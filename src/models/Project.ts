import { PrismaClient, Projects } from '@prisma/client';

const prisma = new PrismaClient();

const createProject = async (projectName: string) => {
  prisma.$connect();
  const newProject = await prisma.projects.create({
    data: {
      Name: projectName,
    },
  });
  prisma.$disconnect();

  return newProject;
};

const findProjectByName = async (projectName: string) => {
  prisma.$connect();
  const project: Projects | null = await prisma.projects.findUnique({
    where: {
      Name: projectName,
    },
  });
  prisma.$disconnect();

  return project;
};

const findAllProjects = async () => {
  prisma.$connect();
  const projects = await prisma.projects.findMany({
    where: {
      DeletedAt: {
        not: null,
      },
    },
  });
  prisma.$disconnect();

  return projects;
};

const updateProjects = async (projectName: string, newProjectName: string) => {
  prisma.$connect();
  const project = await prisma.projects.update({
    where: {
      Name: projectName,
    },
    data: {
      Name: newProjectName,
      UpdatedAt: new Date().toUTCString(),
    },
  });
  prisma.$disconnect();

  return project;
};

const deleteProject = async (projectName: string) => {
  prisma.$connect();
  const project = await prisma.projects.update({
    where: {
      Name: projectName,
    },
    data: {
      DeletedAt: new Date().toUTCString(),
    },
  });
  prisma.$disconnect();

  return project;
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  updateProjects,
  deleteProject,
};
