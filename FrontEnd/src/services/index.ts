import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

const baseURL = 'http://localhost:3003';

interface ILogin {
  token: string | null;
  error: string | null;
}

export interface ICollaborator {
  Id: string;
  Name: string;
}

export interface ITimeTracker {
  Id: string;
  StartDate: Date;
  EndDate?: Date | null;
  TimeZoneId: string;
  TaskId: string;
  CollaboratorId: string;
  CreatedAt: Date;
  UpdatedAt: Date | null;
  DeletedAt?: Date | null;
  Collaborator: ICollaborator;
}

export interface ITask {
  Id: string;
  Name: string;
  Description: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  TimeTrackers: ITimeTracker[];
}
export interface IProject {
  Id: string;
  Name: string;
  CreatedAt: Date;
  Tasks: ITask[];
  UpdatedAt: Date;
}

// interface ITask {}

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

const searchCollaborators = async (word: string): Promise<ICollaborator[] | { message: string }> => {
  const { token } = localStorage;
  try {
    const { data }: { data: ICollaborator[] } = await axios.post(
      `${baseURL}/user/collaboratorName`,
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

const createProject = async (name: string): Promise<string> => {
  const { token } = localStorage;
  try {
    const { data }: any = await axios.post(
      `${baseURL}/project/create`,
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
    const { data }: any = await axios.get(`${baseURL}/project/All`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const createTask = async (Name: string, ProjectId: string, Description: string): Promise<string> => {
  const { token } = localStorage;
  try {
    const { data }: any = await axios.post(
      `${baseURL}/task/create`,
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

const addCollaborator = async (ProjectId: string, CollaboratorId: string, TaskId: string, EndDate: Date): Promise<string> => {
  const { token } = localStorage;
  const TimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    await axios.post(
      `${baseURL}/timetracker/create`,
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
    await axios.delete(`${baseURL}/timetracker/delete?users=${JSON.stringify(users)}&TaskId=${TaskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return 'Colaborador removido com sucesso!';
  } catch (error: any) {
    return error.response.data.message;
  }
};

export default {
  login,
  tokenVerify,
  searchCollaborators,
  createProject,
  getProjects,
  createTask,
  addCollaborator,
  deleteTimeTrackerByTaskAndCollaborator,
};
