import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from '../controller/task.controller.js'
import auth from '../middlerware/auth.middlerware.js';

const router = express.Router();

router.post('/', auth, createTask);
router.get('/:projectId', auth, getTasksByProject);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;