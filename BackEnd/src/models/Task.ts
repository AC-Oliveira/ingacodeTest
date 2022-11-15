import { PrismaClient } from '@prisma/client';
import errors from '../messages/error';

const prisma = new PrismaClient();

interface Tasks {
  Name: string;
  Description: string;
  ProjectId: string;
}

const createTask = async (task: Tasks) => {
  prisma.$connect();
  const newTask = await prisma.tasks.create({
    data: {
      Name: task.Name,
      Description: task.Description,
      ProjectId: task.ProjectId,
    },
  });
  prisma.$disconnect();
};

const findAllProjectTasks = async (ProjectId: string) => {
  prisma.$connect();
  const tasks = await prisma.tasks.findMany({
    where: {
      ProjectId: ProjectId,
    },
    select: {
      Name: true,
      Description: true,
      ProjectId: true,
      TimeTrackers: true,
    },
  });
  prisma.$disconnect();
  return tasks;
};

const updateTask = async (Id: string, Description: string, Name: string) => {
  try {
    prisma.$connect();
    const task = await prisma.tasks.update({
      where: { Id },
      data: {
        Description,
        Name,
      },
    });
    prisma.$disconnect();
    return task;
  } catch (error: any) {
    if (error.code === 'P2025') throw new Error(errors.TASK_NOT_FOUND);
    throw error;
  }
};

const deleteTask = async (Id: string) => {
  try {
    prisma.$connect();
    await prisma.tasks.update({
      where: { Id },
      data: {
        DeletedAt: new Date(),
      },
    });
    prisma.$disconnect();
  } catch (error: any) {
    if (error.code === 'P2025') throw new Error(errors.TASK_NOT_FOUND);
    throw error;
  }
};

export default { createTask, findAllProjectTasks, updateTask, deleteTask };
