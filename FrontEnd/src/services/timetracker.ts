import server, { ITimeTracker } from '.';

const addCollaborator = async (
  ProjectId: string,
  CollaboratorId: string,
  TaskId: string
): Promise<{ message: string; error?: boolean; TimeTracker?: ITimeTracker }> => {
  const { token } = localStorage;
  const TimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    const start = new Date();
    const end = start.setMilliseconds(start.getMilliseconds() + 1000);
    const { data }: any = await server.post(
      '/timetracker/create',
      { ProjectId, CollaboratorId, TaskId, TimeZoneId, StartDate: start, EndDate: end },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { message: data.message, TimeTracker: data.TimeTracker };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
  }
};

const getActiveOrLastTimeTrackerByCollaborator = async (): Promise<{ message: string; error?: boolean; TaskId?: string }> => {
  try {
    const { data } = await server.get('/timetracker/last', {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return { message: data.message, TaskId: data.TaskId };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
  }
};

const getTodayTotalTime = async (): Promise<{ error?: boolean; time?: { ms: number } }> => {
  try {
    const { data } = await server.get('/timetracker/timetoday', {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return { time: data };
  } catch (error: any) {
    return { error: true };
  }
};

const deleteTimeTrackerByTaskAndCollaborator = async (
  users: { CollaboratorId: string }[],
  TaskId: string
): Promise<{ message: string; TimeTracker?: ITimeTracker[]; error?: boolean }> => {
  const { token } = localStorage;
  try {
    const { data } = await server.delete(`/timetracker/delete?users=${JSON.stringify(users)}&TaskId=${TaskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { message: data.message, TimeTracker: data.TimeTrackers };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
  }
};

export default {
  addCollaborator,
  getTodayTotalTime,
  getActiveOrLastTimeTrackerByCollaborator,
  deleteTimeTrackerByTaskAndCollaborator,
};
