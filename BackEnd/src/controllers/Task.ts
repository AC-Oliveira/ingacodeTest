import { Tasks } from '@prisma/client';
import taskService from '../services/Task';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const createTask = async (req: Request, res: Response) => {
  const { ProjectId, Name, Description } = req.body as unknown as Tasks;
  try {
    await taskService.createTask({ ProjectId, Name, Description });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Task criada com sucesso!' });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findAllProjectTasks = async (req: Request, res: Response) => {
  const { ProjectId } = req.params;
  try {
    const tasks = await taskService.findAllProjectTasks(ProjectId);
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { Id } = req.params;
  const { Description, Name } = req.body as unknown as Tasks;
  try {
    await taskService.updateTaskDescription(Id, Description, Name);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Descrição da Task atualizada com sucesso!' });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export default { createTask, findAllProjectTasks, updateTask };
