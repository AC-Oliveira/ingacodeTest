import projectModel from '../models/Project';

const createProject = async (name: string) => {
  const project = await projectModel.createProject(name);
  return project;
};

const findProjectByName = async (name: string) => {
  const project = await projectModel.findProjectByName(name);
  return project;
};

const findAllProjects = async () => {
  const projects = await projectModel.findAllProjects();
  return projects;
};

const updateProjects = async (projectName: string, newProjectName: string) => {
  const project = await projectModel.updateProjects(
    projectName,
    newProjectName
  );
  return project;
};

const deleteProject = async (projectName: string) => {
  const project = await projectModel.deleteProject(projectName);
  return project;
};

export default {
  createProject,
  findProjectByName,
  findAllProjects,
  updateProjects,
  deleteProject,
};
