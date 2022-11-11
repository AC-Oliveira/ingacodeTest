import express = require('express');
import userRoutes from './routes/User';
import projectRoutes from './routes/Project';
import timeTrackerRoutes from './routes/TimeTracker';
import jwtRoutes from './routes/jwt';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/jwt', jwtRoutes);
app.use('/user', userRoutes);
app.use('/projects', projectRoutes);
app.use('/timetracker', timeTrackerRoutes);

export default app;
