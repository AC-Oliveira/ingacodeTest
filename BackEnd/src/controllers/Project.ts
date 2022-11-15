import { Request, Response } from 'express';
import projectService from '../services/Project';
import { StatusCodes } from 'http-status-codes';
import success from '../messages/success';

const createProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await projectService.createProject(name);
    res
      .status(StatusCodes.CREATED)
      .json({ message: success.PROJECT_CREATED_SUCCESS });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findProjectByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const project = await projectService.findProjectByName(name);
    res.status(StatusCodes.OK).json(project);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProjects();
    res.status(StatusCodes.OK).json(projects);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const updateProjects = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { newName } = req.body;
    await projectService.updateProjects(name, newName);
    res
      .status(StatusCodes.OK)
      .json({ message: success.PROJECT_RENAMED_SUCCESS });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    await projectService.deleteProject(name);
    res.status(StatusCodes.OK).json({ message: `Projeto ${name} deletado.` });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  updateProjects,
  deleteProject,
};
