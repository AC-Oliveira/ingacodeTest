import server, { IProject } from '.';

const createProject = async (name: string): Promise<{ message: string; error?: boolean | undefined; Project?: IProject }> => {
  const { token } = localStorage;
  try {
    const { data }: any = await server.post(
      '/project/create',
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { message: data.message, Project: data.Project };
  } catch (error: any) {
    return { message: error.response.data.message as string, error: true };
  }
};

const getProjects = async (): Promise<IProject[]> => {
  const { token } = localStorage;
  try {
    const { data }: any = await server.get('/project/All', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const updateProjectName = async (id: string, name: string): Promise<{ message: string; error?: boolean; Project?: IProject }> => {
  try {
    const { data } = await server.put(`/project/update/${id}`, { name }, { headers: { Authorization: `Bearer ${localStorage.token}` } });
    return { message: data.message, Project: data.Project };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
  }
};

const findActiveProject = async (TaskId: string): Promise<IProject | boolean> => {
  try {
    const { data }: any = await server.get(`/project/task/${TaskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    return data;
  } catch (error: any) {
    return false;
  }
};

const deleteProject = async (id: string): Promise<{ message: string; error?: boolean; Name?: string }> => {
  try {
    const { data } = await server.delete(`/project/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return { message: data.message, Name: data.Name };
  } catch (error: any) {
    return { message: error.response.data.message, error: true };
  }
};

export default {
  createProject,
  getProjects,
  findActiveProject,
  updateProjectName,
  deleteProject,
};
