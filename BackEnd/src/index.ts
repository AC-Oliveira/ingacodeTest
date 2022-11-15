import express = require('express');
import userRoutes from './routes/User';
import projectRoutes from './routes/Project';
import timeTrackerRoutes from './routes/TimeTracker';
import jwtRoutes from './routes/jwt';
import cors from 'cors';
import taskRoutes from './routes/Task';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/jwt', jwtRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);
app.use('/timetracker', timeTrackerRoutes);

export default app;
