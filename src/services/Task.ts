import error from '../messages/error';
import projectModel from '../models/Project';
import taskModel from '../models/Task';

const createTask = async ({ ProjectId, Name, Description }) => {
  const project = await projectModel.findProjectById(ProjectId);
  if (!project) throw new Error(error.PROJECT_NOT_FOUND);
  await taskModel.createTask({ ProjectId, Name, Description });
};

const findAllProjectTasks = async (ProjectId: string) => {
  const project = await projectModel.findProjectById(ProjectId);
  if (!project) throw new Error(error.PROJECT_NOT_FOUND);
  const tasks = await taskModel.findAllProjectTasks(ProjectId);
  return tasks;
};

const findTaskById = async (Id: string) => {};

export default { createTask, findAllProjectTasks };
