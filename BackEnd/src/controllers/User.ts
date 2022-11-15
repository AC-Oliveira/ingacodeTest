import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import success from '../messages/success';
import userService from '../services/User';

interface ICreateUser {
  username: string;
  password: string;
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await userService.loginUser(username, password);
    res.status(StatusCodes.OK).json(token);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const createUser = async (req: Request<{}, {}, ICreateUser>, res: Response) => {
  try {
    const { username, password } = req.body;
    await userService.createUser(username, password);
    res
      .status(StatusCodes.CREATED)
      .json({ message: success.USER_CREATED_SUCCESS });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const createCollaborator = async (req: Request, res: Response) => {
  try {
    const { name, username } = req.body;
    await userService.createCollaborator(name, username);
    res
      .status(StatusCodes.CREATED)
      .json({ message: success.COLLABORATOR_CREATED_SUCCESS });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.findAllUsers();
    res.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findAllCollaborators = async (req: Request, res: Response) => {
  try {
    const result = await userService.findAllCollaborators();
    res.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findCollaboratorsByName = async (req: Request, res: Response) => {
  const { word } = req.body;
  const result = await userService.findCollaboratorsByName(word);
  res.status(StatusCodes.OK).json(result);
};

export default {
  loginUser,
  createUser,
  createCollaborator,
  findAllUsers,
  findAllCollaborators,
  findCollaboratorsByName,
};
