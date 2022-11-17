import server, { ITimeTracker } from '.';

const addCollaborator = async (
  ProjectId: string,
  CollaboratorId: string,
  TaskId: string,
  EndDate: Date
): Promise<{ message: string; error?: boolean; TimeTracker?: ITimeTracker }> => {
  const { token } = localStorage;
  const TimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    const { data }: any = await server.post(
      '/timetracker/create',
      { ProjectId, CollaboratorId, EndDate, TaskId, TimeZoneId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { message: data.message, TimeTracker: data.TimeTracker };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
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
    return { message: data.message, TimeTracker: data.TimeTracker };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
  }
};

export default {
  addCollaborator,
  deleteTimeTrackerByTaskAndCollaborator,
};
