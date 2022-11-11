import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import timeTrackerService from '../services/TimeTracker';

const createTimeTracker = async (req: Request, res: Response) => {
  try {
    const timeTracker = req.body;
    await timeTrackerService.createTimeTracker(timeTracker);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'TimeTracker criado com sucesso!' });
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

export default { createTimeTracker, finishTimeTracker, findRunningTimeTracker };
