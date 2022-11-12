import error from '../messages/error';
import timeTrackerModel from '../models/TimeTracker';
import { ITimeTrackers } from '../models/TimeTracker';
import userService from '../services/User';

const createTimeTracker = async ({
  CollaboratorId,
  EndDate,
  TaskId,
  TimeZoneId,
}: ITimeTrackers) => {
  const running = await timeTrackerModel.findRunningTimeTracker(CollaboratorId);
  if (running.length > 0) throw new Error(error.TIME_TRACKER_ALREADY_RUNNING);
  timeTrackerModel.createTimeTracker({
    CollaboratorId,
    EndDate,
    TaskId,
    TimeZoneId,
  });
};

const finishTimeTracker = async (Id: string) => {
  const running = await timeTrackerModel.findRunningTimeTracker(Id);
  if (running.length === 0) throw new Error(error.TIME_TRACKER_NOT_RUNNING);
  timeTrackerModel.finishTimeTracker(Id);
};

const findRunningTimeTracker = async (ColaboratorId: string) => {
  const running = await timeTrackerModel.findRunningTimeTracker(ColaboratorId);
  return running;
};

const deleteTimeTrackerByTaskAndCollaborator = async (
  users: { CollaboratorId: string; Name: string }[],
  TaskId: string
) => {
  await Promise.all(
    users.map(async (user) => {
      await userService.findCollaboratorById(user.CollaboratorId, user.Name);
      await timeTrackerModel.deleteTimeTrackerByTaskAndCollaborator(
        user.CollaboratorId,
        TaskId
      );
    })
  );
};

export default {
  createTimeTracker,
  finishTimeTracker,
  findRunningTimeTracker,
  deleteTimeTrackerByTaskAndCollaborator,
};
