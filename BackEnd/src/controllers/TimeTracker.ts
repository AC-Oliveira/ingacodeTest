import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import timeTrackerService from '../services/TimeTracker';

const createTimeTracker = async (req: Request, res: Response) => {
  try {
    const timeTracker = req.body;
    const createdTimeTracker = await timeTrackerService.createTimeTracker(
      timeTracker
    );
    res.status(StatusCodes.CREATED).json({
      message: 'TimeTracker criado com sucesso!',
      TimeTracker: createdTimeTracker,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getTodayTotalTime = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const total = await timeTrackerService.getTodayTotalTime(userId);
    res.status(StatusCodes.OK).json({
      ms: total,
      min: Math.floor((total % 3600000) / 60000),
      h: Math.floor(total / 3600000),
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const finishTimeTracker = async (req: Request, res: Response) => {
  try {
    const { Id } = req.body;
    await timeTrackerService.finishTimeTracker(Id);
    res
      .status(StatusCodes.OK)
      .json({ message: 'TimeTracker finalizado com sucesso!' });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findRunningTimeTracker = async (req: Request, res: Response) => {
  try {
    const { ColaboratorId } = req.body;
    const running = await timeTrackerService.findRunningTimeTracker(
      ColaboratorId
    );
    res.status(StatusCodes.OK).json({ running });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const deleteTimeTrackerByTaskAndCollaborator = async (
  req: Request,
  res: Response
) => {
  try {
    const userString: any = req.query['users'];
    const users = JSON.parse(userString);
    const { TaskId }: any = req.query;

    const remainingTimeTrackers =
      await timeTrackerService.deleteTimeTrackerByTaskAndCollaborator(
        users,
        TaskId
      );
    res.status(StatusCodes.OK).json({
      message: 'Collaborador(es) removido(s) da Task com sucesso!',
      TimeTrackers: remainingTimeTrackers,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const findRunningOrLastTimeTracker = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const currTimeTracker =
      await timeTrackerService.findRunningOrLastTimeTracker(userId);
    console.log(currTimeTracker, userId);
    res.status(StatusCodes.OK).json({ TaskId: currTimeTracker?.TaskId });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export default {
  createTimeTracker,
  getTodayTotalTime,
  finishTimeTracker,
  findRunningTimeTracker,
  findRunningOrLastTimeTracker,
  deleteTimeTrackerByTaskAndCollaborator,
};
