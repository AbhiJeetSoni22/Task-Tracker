import express from 'express';
import cors from 'cors';
import dbConnect from './db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';
import taskRoutes from './routes/task.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const url = process.env.MONGO_URI
dbConnect(url)

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);