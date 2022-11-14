import axios from 'axios';

const baseURL = 'http://localhost:3003';

const server = axios.create({
  baseURL,
  timeout: 1000,
});

export default server;

export interface ILogin {
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

const tokenVerify = async (token: string): Promise<boolean> => {
  try {
    const { data } = await server.post(
      '/jwt',
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

export const services = { tokenVerify };
