import { PrismaClient } from '@prisma/client';
import errors from '../messages/error';

const prisma = new PrismaClient();

interface Tasks {
  Name: string;
  Description: string;
  ProjectId: string;
}

const createTask = async (task: Tasks) => {
  const newTask = await prisma.tasks.create({
    data: {
      Name: task.Name,
      Description: task.Description,
      ProjectId: task.ProjectId,
    },
    select: {
      Id: true,
      Name: true,
      Description: true,
      ProjectId: true,
      TimeTrackers: true,
      CreatedAt: true,
      UpdatedAt: true,
    },
  });
  return newTask;
};

const findAllProjectTasks = async (ProjectId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      ProjectId: ProjectId,
    },
    select: {
      Id: true,
      Name: true,
      Description: true,
      ProjectId: true,
      TimeTrackers: true,
    },
  });
  return tasks;
};

const updateTask = async (Id: string, Description: string, Name: string) => {
  try {
    const task = await prisma.tasks.update({
      where: { Id },
      data: {
        Description,
        Name,
        UpdatedAt: new Date(),
      },
    });
    return task;
  } catch (error: any) {
    if (error.code === 'P2025') throw new Error(errors.TASK_NOT_FOUND);
    throw error;
  }
};

const deleteTask = async (Id: string) => {
  try {
    const task = await prisma.tasks.update({
      where: { Id },
      data: {
        DeletedAt: new Date(),
        TimeTrackers: {
          updateMany: {
            where: {
              TaskId: Id,
            },
            data: {
              DeletedAt: new Date(),
            },
          },
        },
      },
    });
    return task;
  } catch (error: any) {
    if (error.code === 'P2025') throw new Error(errors.TASK_NOT_FOUND);
    throw error;
  }
};

const deleteAllProjectTasks = async (ProjectId: string) => {
  try {
    await prisma.tasks.updateMany({
      where: { ProjectId },
      data: {
        DeletedAt: new Date(),
      },
    });
  } catch (error: any) {
    if (error.code === 'P2025') throw new Error(errors.TASK_NOT_FOUND);
    throw error;
  }
};

export default {
  createTask,
  findAllProjectTasks,
  updateTask,
  deleteTask,
  deleteAllProjectTasks,
};
