import server, { IProject } from '.';

const createProject = async (name: string): Promise<string> => {
  const { token } = localStorage;
  try {
    const { data }: any = await server.post(
      '/project/create',
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data.message;
  } catch (error: any) {
    return error.response.data.message;
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
