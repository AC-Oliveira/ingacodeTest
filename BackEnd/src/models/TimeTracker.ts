import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ITimeTrackers {
  Id?: string;
  StartDate?: Date;
  EndDate?: Date | null;
  TimeZoneId: string;
  TaskId: string;
  CollaboratorId: string;
  CreatedAt?: Date;
  UpdatedAt?: Date | null;
  DeletedAt?: Date | null;
}

const createTimeTracker = async (timetracker: ITimeTrackers) => {
  try {
    const timeTracker = await prisma.timeTrackers.create({
      data: timetracker,
      select: {
        Id: true,
        StartDate: true,
        EndDate: true,
        TimeZoneId: true,
        TaskId: true,
        CollaboratorId: true,
        CreatedAt: true,
        UpdatedAt: true,
        Collaborator: true,
      },
    });
    return timeTracker;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getTodayTimeTrackers = async (CollaboratorId: string) => {
  const today = new Date();
  const timeTrackers = await prisma.timeTrackers.findMany({
    where: {
      CollaboratorId,
      StartDate: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    },
    select: {
      StartDate: true,
      EndDate: true,
    },
  });
  return timeTrackers;
};

const finishTimeTracker = (Id: string) => {
  prisma.timeTrackers.update({
    where: { Id },
    data: { EndDate: new Date() },
  });
};

const findRunningTimeTracker = (CollaboratorId: string) => {
  const runningTimeTracker = prisma.timeTrackers.findFirst({
    where: { CollaboratorId, EndDate: null },
  });
  return runningTimeTracker;
};

const findTimeTrackerByTaskId = async (Id: string) => {
  const timeTrackers = await prisma.timeTrackers.findMany({
    where: { TaskId: Id, DeletedAt: null },
    select: {
      Id: true,
      StartDate: true,
      EndDate: true,
      TimeZoneId: true,
      TaskId: true,
      CollaboratorId: true,
      CreatedAt: true,
      UpdatedAt: true,
      Collaborator: true,
    },
  });
  return timeTrackers;
};

const findRunningOrLastTimeTracker = async (CollaboratorId: string) => {
  const activeTimeTracker = await prisma.timeTrackers.findFirst({
    where: { CollaboratorId, EndDate: null, DeletedAt: null },
  });
  const lastTimeTracker = await prisma.timeTrackers.findFirst({
    where: { CollaboratorId, DeletedAt: null },
  });

  console.log(444, activeTimeTracker, lastTimeTracker, CollaboratorId);

  return activeTimeTracker || lastTimeTracker;
};

const deleteTimeTrackerByTaskAndCollaborator = async (
  CollaboradorId: string,
  TaskId: string
) => {
  await prisma.timeTrackers.updateMany({
    where: { CollaboratorId: CollaboradorId, TaskId: TaskId },
    data: { DeletedAt: new Date() },
  });
};

const deleTimeTrackerByProjectId = async (ProjectId: string) => {
  await prisma.timeTrackers.updateMany({
    where: { Task: { ProjectId: ProjectId } },
    data: { DeletedAt: new Date() },
  });
};
export default {
  createTimeTracker,
  getTodayTimeTrackers,
  finishTimeTracker,
  findRunningTimeTracker,
  findRunningOrLastTimeTracker,
  findTimeTrackerByTaskId,
  deleteTimeTrackerByTaskAndCollaborator,
  deleTimeTrackerByProjectId,
};
