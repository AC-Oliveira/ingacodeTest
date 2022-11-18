import { PrismaClient, Projects } from '@prisma/client';

const prisma = new PrismaClient();

const createProject = async (projectName: string) => {
  const newProject = await prisma.projects.create({
    data: {
      Name: projectName,
    },
    select: {
      Id: true,
      Name: true,
      CreatedAt: true,
      UpdatedAt: true,
      Tasks: true,
    },
  });
  return newProject;
};

const findProjectByName = async (projectName: string) => {
  const project: Projects | null = await prisma.projects.findFirst({
    where: {
      Name: projectName,
      DeletedAt: {
        equals: null,
      },
    },
  });

  return project;
};

const findProjectById = async (Id: string) => {
  const project: any = await prisma.projects.findUnique({
    where: {
      Id: Id,
    },
    select: {
      Id: true,
      Name: true,
      CreatedAt: true,
      Tasks: {
        where: {
          DeletedAt: {
            equals: null,
          },
        },
      },
    },
  });

  return project;
};

const findAllProjects = async () => {
  const projects = await prisma.projects.findMany({
    where: {
      DeletedAt: {
        equals: null,
      },
    },
    select: {
      Id: true,
      Name: true,
      CreatedAt: true,
      Tasks: {
        where: {
          DeletedAt: {
            equals: null,
          },
        },
        select: {
          Id: true,
          Name: true,
          Description: true,
          CreatedAt: true,
          UpdatedAt: true,
          TimeTrackers: {
            where: {
              DeletedAt: {
                equals: null,
              },
            },
            select: {
              Id: true,
              StartDate: true,
              EndDate: true,
              CreatedAt: true,
              UpdatedAt: true,
              TimeZoneId: true,
              TaskId: true,
              CollaboratorId: true,
              Collaborator: true,
            },
          },
        },
      },
      UpdatedAt: true,
    },
    orderBy: {
      CreatedAt: 'asc',
    },
  });

  return projects;
};

const updateProject = async (Id: string, newProjectName: string) => {
  const project = await prisma.projects.update({
    where: {
      Id,
    },
    data: {
      Name: newProjectName,
      UpdatedAt: new Date(),
    },
  });
  return project;
};

const deleteProject = async (Id: string) => {
  const projectDeleted = await prisma.projects.update({
    where: {
      Id,
    },
    data: {
      DeletedAt: new Date(),
    },
    select: {
      Tasks: true,
    },
  });
  return projectDeleted;
};

const findProjectByTaskId = async (taskId: string) => {
  const project = await prisma.projects.findFirst({
    where: {
      Tasks: {
        some: {
          Id: taskId,
        },
      },
    },
    select: {
      Id: true,
      Name: true,
      CreatedAt: true,

      Tasks: {
        where: {
          Id: taskId,
        },
        select: {
          Id: true,
          Name: true,
          Description: true,
          TimeTrackers: {
            select: {
              TimeZoneId: true,
              Collaborator: {
                select: {
                  Id: true,
                  Name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return project;
};

export default {
  createProject,
  findProjectByName,
  findProjectById,
  findAllProjects,
  findProjectByTaskId,
  updateProject,
  deleteProject,
};
