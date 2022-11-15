import server from '.';

const createTask = async (Name: string, ProjectId: string | undefined, Description: string): Promise<{ message: string; error?: boolean | undefined }> => {
  const { token } = localStorage;
  try {
    const { data }: any = await server.post(
      `/task/create/${ProjectId}`,
      { Name, Description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { message: data.message };
  } catch (error: any) {
    return { message: error.response.data.message as string, error: true };
  }
};

const updateTask = async (TaskId: string, Description: string, Name: string): Promise<{ message: string; error?: boolean }> => {
  const { token } = localStorage;
  try {
    const { data } = await server.put(
      `/task/update/${TaskId}`,
      { Description, Name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { message: data.message };
  } catch (error: any) {
    return { message: error.response.data.message as string, error: true };
  }
};

const deleteTask = async (TaskId: string): Promise<{ message: string; error?: boolean }> => {
  const { token } = localStorage;
  try {
    const { data } = await server.delete(`/task/delete/${TaskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { message: data.message };
  } catch (error: any) {
    return { message: error.response.data.message as string, error: true };
  }
};

export default {
  createTask,
  updateTask,
  deleteTask,
};
