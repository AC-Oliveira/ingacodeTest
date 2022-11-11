import error from '../messages/error';
import projectModel from '../models/Project';

const findProjectByName = async (name: string) => {
  const project = await projectModel.findProjectByName(name);
  return project;
};
const createProject = async (name: string) => {
  const projectExists = await projectModel.findProjectByName(name);
  if (projectExists) throw new Error(error.PROJECT_ALREADY_EXISTS);
  const project = await projectModel.createProject(name);
};

const findAllProjects = async () => {
  const projects = await projectModel.findAllProjects();
  return projects;
};

const updateProjects = async (projectName: string, newProjectName: string) => {
  const projectExists = await projectModel.findProjectByName(projectName);
  if (!projectExists) throw new Error(error.PROJECT_NOT_FOUND);
  await projectModel.updateProjects(projectName, newProjectName);
};

const deleteProject = async (projectName: string) => {
  const projectExists = await projectModel.findProjectByName(projectName);
  if (!projectExists) throw new Error(error.PROJECT_NOT_FOUND);
  const project = await projectModel.deleteProject(projectName);
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  updateProjects,
  deleteProject,
};
