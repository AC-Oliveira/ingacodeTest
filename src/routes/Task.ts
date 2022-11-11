import express = require('express');
import taskController from '../controllers/Task';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/create', auth.validateTokenMiddleware, taskController.createTask);
router.get(
  '/projectTasks/:ProjectId',
  auth.validateTokenMiddleware,
  taskController.findAllProjectTasks
);

export default router;
