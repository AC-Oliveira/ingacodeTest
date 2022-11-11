import express = require('express');
import projectController from '../controllers/Project';

const router = express.Router();

router.post('/create', projectController.createProject);
router.get('/find/:name', projectController.findProjectByName);
router.get('/findAll', projectController.findAllProjects);
router.put('/update/:name', projectController.updateProjects);
router.delete('/delete/:name', projectController.deleteProject);

export default router;
