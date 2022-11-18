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
  if (running) throw new Error(error.TIME_TRACKER_ALREADY_RUNNING);
  const timeTracker = await timeTrackerModel.createTimeTracker({
    CollaboratorId,
    EndDate,
    TaskId,
    TimeZoneId,
  });
  return timeTracker;
};

const finishTimeTracker = async (Id: string) => {
  const running = await timeTrackerModel.findRunningTimeTracker(Id);
  if (running) throw new Error(error.TIME_TRACKER_NOT_RUNNING);
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
  const timeTrackers = await timeTrackerModel.findTimeTrackerByTaskId(TaskId);
  return timeTrackers;
};

const findRunningOrLastTimeTracker = async (CollaboratorId: string) => {
  const currTimeTracker = await timeTrackerModel.findRunningOrLastTimeTracker(
    CollaboratorId
  );
  // console.log(555, currTimeTracker);

  return currTimeTracker;
};

const getTodayTotalTime = async (CollaboratorId: string) => {
  const timeTrackers = await timeTrackerModel.getTodayTimeTrackers(
    CollaboratorId
  );
  console.log(timeTrackers);

  const totalTime = timeTrackers.reduce((acc, curr) => {
    const timeEnd = curr.EndDate
      ? Date.parse(String(curr.EndDate))
      : Date.parse(String(new Date()));
    const timeStart = Date.parse(String(curr.StartDate));
    const diff = timeEnd - timeStart;
    return acc + diff;
  }, 0);
  return totalTime;
};

export default {
  createTimeTracker,
  getTodayTotalTime,
  finishTimeTracker,
  findRunningOrLastTimeTracker,
  findRunningTimeTracker,
  deleteTimeTrackerByTaskAndCollaborator,
};
