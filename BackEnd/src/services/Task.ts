import projectServices from '../services/Project';
import taskModel from '../models/Task';

const createTask = async ({
  ProjectId,
  Name,
  Description,
}: {
  ProjectId: string;
  Name: string;
  Description: string;
}) => {
  await projectServices.findProjectById(ProjectId);
  const newtask = await taskModel.createTask({ ProjectId, Name, Description });
  return newtask;
};

const findAllProjectTasks = async (ProjectId: string) => {
  await projectServices.findProjectById(ProjectId);
  const tasks = await taskModel.findAllProjectTasks(ProjectId);
  return tasks;
};

const updateTaskDescription = async (
  Id: string,
  Description: string,
  Name: string
) => {
  try {
    const task = await taskModel.updateTask(Id, Description, Name);
    return task;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (Id: string) => {
  try {
    const task = await taskModel.deleteTask(Id);
    return task.ProjectId;
  } catch (error) {
    throw error;
  }
};

const deleteAllProjectTasks = async (ProjectId: string) => {
  try {
    await projectServices.findProjectById(ProjectId);
    await taskModel.deleteAllProjectTasks(ProjectId);
  } catch (error) {
    throw error;
  }
};

export default {
  createTask,
  findAllProjectTasks,
  updateTaskDescription,
  deleteTask,
};
