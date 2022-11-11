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
    prisma.$connect();
    await prisma.timeTrackers.create({
      data: timetracker,
    });
    prisma.$disconnect();
  } catch (error: any) {
    console.log(error.message);
  }
};

const finishTimeTracker = (Id: string) => {
  prisma.$connect();
  prisma.timeTrackers.update({
    where: { Id },
    data: { EndDate: new Date() },
  });
  prisma.$disconnect();
};

const findRunningTimeTracker = (CollaboratorId: string) => {
  prisma.$connect();
  const runningTimeTracker = prisma.timeTrackers.findMany({
    where: { CollaboratorId, EndDate: null },
  });
  prisma.$disconnect();
  return runningTimeTracker;
};

const deleteTimeTrackerByTaskAndCollaborator = async (
  CollaboradorId: string,
  TaskId: string
) => {
  prisma.$connect();
  await prisma.timeTrackers.updateMany({
    where: { CollaboratorId: CollaboradorId, TaskId: TaskId },
    data: { DeletedAt: new Date() },
  });
  prisma.$disconnect();
};

export default {
  createTimeTracker,
  finishTimeTracker,
  findRunningTimeTracker,
  deleteTimeTrackerByTaskAndCollaborator,
};
