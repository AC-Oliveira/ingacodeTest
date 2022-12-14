import express = require('express');
import auth from '../middlewares/auth';
import timeTrackerController from '../controllers/TimeTracker';

const router = express.Router();

router.get(
  '/last',
  auth.validateTokenMiddleware,
  timeTrackerController.findRunningOrLastTimeTracker
);

router.get(
  '/timetoday',
  auth.validateTokenMiddleware,
  timeTrackerController.getTodayTotalTime
);

router.post(
  '/create',
  auth.validateTokenMiddleware,
  timeTrackerController.createTimeTracker
);
router.post(
  '/finish',
  auth.validateTokenMiddleware,
  timeTrackerController.finishTimeTracker
);
router.post(
  '/running',
  auth.validateTokenMiddleware,
  timeTrackerController.findRunningTimeTracker
);

router.delete(
  '/delete',
  timeTrackerController.deleteTimeTrackerByTaskAndCollaborator
);

export default router;
