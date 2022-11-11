import { Request, Response } from 'express';
import Project from '../services/Project';

const createProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await Project.createProject(name);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const findProjectByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const result = await Project.findProjectByName(name);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const findAllProjects = async (req: Request, res: Response) => {
  try {
    const result = await Project.findAllProjects();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateProjects = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { newName } = req.body;
    const result = await Project.updateProjects(name, newName);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const result = await Project.deleteProject(name);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  updateProjects,
  deleteProject,
};
