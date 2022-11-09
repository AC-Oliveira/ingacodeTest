import express = require('express');
import userRoutes from './routes/User';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', userRoutes);

export default app;
