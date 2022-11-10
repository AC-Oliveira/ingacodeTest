import axios, { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';

const baseURL = 'http://localhost:3003';

interface ILogin {
  token: string | null;
  error: string | null;
}

const login = async (username: string, password: string, cb: NavigateFunction): Promise<ILogin | void> => {
  try {
    const {
      data: { token },
    }: any = await axios.post(`${baseURL}/user/login`, { username, password });
    localStorage.token = token;
    cb('/dashboard');
  } catch (error: any) {
    return { token: null, error: error.message };
  }
};

const tokenVerify = async (token: string): Promise<boolean> => {
  try {
    const { data } = await axios.post(
      `${baseURL}/jwt`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default {
  login,
  tokenVerify,
};
