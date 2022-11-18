import express = require('express');
import projectController from '../controllers/Project';
import auth from '../middlewares/auth';

const router = express.Router();

router.get(
  '/find/:name',
  auth.validateTokenMiddleware,
  projectController.findProjectByName
);
router.get(
  '/All',
  auth.validateTokenMiddleware,
  projectController.findAllProjects
);
router.get(
  '/task/:TaskId',
  auth.validateTokenMiddleware,
  projectController.findProjectByTaskId
);
router.post(
  '/create',
  auth.validateTokenMiddleware,
  projectController.createProject
);
router.put(
  '/update/:Id',
  auth.validateTokenMiddleware,
  projectController.updateProject
);
router.delete(
  '/delete/:Id',
  auth.validateTokenMiddleware,
  projectController.deleteProject
);

export default router;
