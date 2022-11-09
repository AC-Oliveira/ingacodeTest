import userController from '../controllers/User';

const express = require('express');
const router = express.Router();

router.post('/login', userController.loginUser);

export default router;
