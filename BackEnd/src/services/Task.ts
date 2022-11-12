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
  await taskModel.createTask({ ProjectId, Name, Description });
};

const findAllProjectTasks = async (ProjectId: string) => {
  await projectServices.findProjectById(ProjectId);
  const tasks = await taskModel.findAllProjectTasks(ProjectId);
  return tasks;
};

const updateTaskDescription = async (Id: string, Description: string) => {
  try {
    await taskModel.updateTaskDescription(Id, Description);
  } catch (error) {
    throw error;
  }
};

export default { createTask, findAllProjectTasks };
