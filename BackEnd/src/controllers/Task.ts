import { Tasks } from '@prisma/client';
import taskService from '../services/Task';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import success from '../messages/success';
import projectServices from '../services/Project';

const createTask = async (req: Request, res: Response) => {
  const { ProjectId } = req.params;
  const { Name, Description } = req.body as unknown as Tasks;
  try {
    const Task = await taskService.createTask({ ProjectId, Name, Description });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: success.TASK_CREATED_SUCCESS, Task });
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
    const Task = await taskService.updateTaskDescription(Id, Description, Name);
    return res
      .status(StatusCodes.OK)
      .json({ message: success.TASK_UPDATED_SUCCESS, Task });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { Id } = req.params;
  try {
    const ProjectId = await taskService.deleteTask(Id);
    const Project = await projectServices.findProjectById(ProjectId);

    return res
      .status(StatusCodes.OK)
      .json({ message: success.TASK_DELETED_SUCCESS, Project });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export default { createTask, findAllProjectTasks, updateTask, deleteTask };
