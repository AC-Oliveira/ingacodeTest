import { Request, Response } from 'express';
import projectService from '../services/Project';
import { StatusCodes } from 'http-status-codes';
import success from '../messages/success';
import timeTrackerService from '../models/TimeTracker';
import Task from '../models/Task';

const createProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const Project = await projectService.createProject(name);
    res
      .status(StatusCodes.CREATED)
      .json({ message: success.PROJECT_CREATED_SUCCESS, Project });
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

const findProjectByTaskId = async (req: Request, res: Response) => {
  try {
    const { TaskId } = req.params;
    const { userId, username } = req.body;
    const project = await projectService.findProjectByTaskId(TaskId);
    res.status(StatusCodes.OK).json({ ...project, userId, username });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;
    const { name } = req.body;
    const updatedProject = await projectService.updateProject(Id, name);
    res.status(StatusCodes.OK).json({
      message: success.PROJECT_RENAMED_SUCCESS,
      Project: updatedProject,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;
    const Names = await projectService.deleteProject(Id);
    // await timeTrackerService.deleTimeTrackerByProjectId(Id);
    console.log(Names);

    res
      .status(StatusCodes.OK)
      // .json({ message: success.PROJECT_DELETE_FN(Name), Name });
      .json({ message: 'ae deletou uhul' });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  findProjectByTaskId,
  updateProject,
  deleteProject,
};
