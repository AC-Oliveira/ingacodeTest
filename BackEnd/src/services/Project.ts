import error from '../messages/error';
import projectModel from '../models/Project';
import taskModel from '../models/Task';

const findProjectByName = async (name: string) => {
  const project = await projectModel.findProjectByName(name);
  return project;
};
const createProject = async (name: string) => {
  const projectExists = await projectModel.findProjectByName(name);
  if (projectExists) throw new Error(error.PROJECT_ALREADY_EXISTS);
  const project = await projectModel.createProject(name);
  return project;
};

const findProjectById = async (id: string) => {
  const project = await projectModel.findProjectById(id);
  if (!project) throw new Error(error.PROJECT_NOT_FOUND);
  return project;
};

const findAllProjects = async () => {
  const projects = await projectModel.findAllProjects();
  return projects;
};

const updateProject = async (Id: string, newProjectName: string) => {
  console.log(555, Id, !newProjectName);

  if (!newProjectName) throw new Error(error.PROJECT_NAME_NOT_VALID);
  const projectExists = await projectModel.findProjectById(Id);
  if (!projectExists) throw new Error(error.PROJECT_NOT_FOUND);
  const updatedProject = await projectModel.updateProject(Id, newProjectName);
  return updatedProject;
};

const deleteProject = async (Id: string) => {
  const project = await projectModel.findProjectById(Id);
  console.log(666, project);

  if (!project) throw new Error(error.PROJECT_NOT_FOUND);
  await taskModel.deleteAllProjectTasks(Id);
  await projectModel.deleteProject(Id);
  return project.Name;
};

const findProjectByTaskId = async (taskId: string) => {
  const project = await projectModel.findProjectByTaskId(taskId);
  return project;
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  findProjectById,
  findProjectByTaskId,
  updateProject,
  deleteProject,
};
