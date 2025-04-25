import express from 'express';
import { createProject, getUserProjects } from '../controller/project.controller.js'
import auth from '../middlerware/auth.middlerware.js';

const router = express.Router();

router.post('/', auth, createProject);
router.get('/', auth, getUserProjects);

export default router;