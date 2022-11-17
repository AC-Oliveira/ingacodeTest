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

export default {
  createProject,
  getProjects,
};
