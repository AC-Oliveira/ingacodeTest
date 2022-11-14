import server from '.';

const addCollaborator = async (ProjectId: string, CollaboratorId: string, TaskId: string, EndDate: Date): Promise<string> => {
  const { token } = localStorage;
  const TimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    await server.post(
      '/timetracker/create',
      { ProjectId, CollaboratorId, EndDate, TaskId, TimeZoneId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return 'Collaborator adcicionado com sucesso!';
  } catch (error: any) {
    return error.response.data.message;
  }
};

const deleteTimeTrackerByTaskAndCollaborator = async (users: { CollaboratorId: string }[], TaskId: string): Promise<string> => {
  const { token } = localStorage;
  try {
    await server.delete(`/timetracker/delete?users=${JSON.stringify(users)}&TaskId=${TaskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return 'Colaborador removido com sucesso!';
  } catch (error: any) {
    return error.response.data.message;
  }
};

export default {
  addCollaborator,
  deleteTimeTrackerByTaskAndCollaborator,
};
