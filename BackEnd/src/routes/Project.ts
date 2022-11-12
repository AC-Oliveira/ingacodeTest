import express = require('express');
import projectController from '../controllers/Project';
import auth from '../middlewares/auth';

const router = express.Router();

router.post(
  '/create',
  auth.validateTokenMiddleware,
  projectController.createProject
);
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
router.put(
  '/update/:name',
  auth.validateTokenMiddleware,
  projectController.updateProjects
);
router.delete(
  '/delete/:name',
  auth.validateTokenMiddleware,
  projectController.deleteProject
);

export default router;
