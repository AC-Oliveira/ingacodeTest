import server from '.';

const createTask = async (Name: string, ProjectId: string, Description: string): Promise<string> => {
  const { token } = localStorage;
  try {
    const { data }: any = await server.post(
      '/task/create',
      { Name, ProjectId, Description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const updateTask = async (TaskId: string, Description: string, Name: string): Promise<string> => {
  const { token } = localStorage;
  try {
    const { data } = await server.put(
      `/tasks/update/${TaskId}`,
      { Description, Name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const deleteTask = async (TaskId: string): Promise<string> => {
  const { token } = localStorage;
  try {
    const { data } = await server.delete(`/tasks/delete/${TaskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export default {
  createTask,
  updateTask,
  deleteTask,
};
