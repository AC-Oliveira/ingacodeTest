import { NavigateFunction } from 'react-router-dom';
import server, { ICollaborator, ILogin } from '.';

const login = async (username: string, password: string, cb: NavigateFunction): Promise<ILogin | void> => {
  try {
    const {
      data: { token },
    }: any = await server.post('/user/login', { username, password });
    localStorage.token = token;
    cb('/dashboard');
  } catch (error: any) {
    return { token: null, error: error.message };
  }
};

const searchCollaborators = async (word: string): Promise<ICollaborator[] | { message: string }> => {
  const { token } = localStorage;
  try {
    const { data }: { data: ICollaborator[] } = await server.post(
      '/user/collaboratorName/',
      { word },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export default {
  login,
  searchCollaborators,
};
