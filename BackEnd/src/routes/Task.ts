import express = require('express');
import taskController from '../controllers/Task';
import auth from '../middlewares/auth';

const router = express.Router();

router.get(
  '/projectTasks/:ProjectId',
  auth.validateTokenMiddleware,
  taskController.findAllProjectTasks
);

router.post(
  '/create/:ProjectId',
  auth.validateTokenMiddleware,
  taskController.createTask
);

router.put(
  '/update/:Id',
  auth.validateTokenMiddleware,
  taskController.updateTask
);

router.delete(
  '/delete/:Id',
  auth.validateTokenMiddleware,
  taskController.deleteTask
);

export default router;
