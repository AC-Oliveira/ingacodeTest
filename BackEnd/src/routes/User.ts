import userController from '../controllers/User';
import express = require('express');
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/users', auth.validateTokenMiddleware, userController.findAllUsers);
router.get(
  '/collaborators',
  auth.validateTokenMiddleware,
  userController.findAllCollaborators
);
router.post('/login', userController.loginUser);
router.post(
  '/createUser',
  auth.validateTokenMiddleware,
  userController.createUser
);
router.post(
  '/createCollaborator',
  auth.validateTokenMiddleware,
  userController.createCollaborator
);
router.post(
  '/collaboratorName',
  auth.validateTokenMiddleware,
  userController.findCollaboratorsByName
);

export default router;
