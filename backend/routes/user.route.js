import express from 'express';
import { signup, login } from '../controller/user.controller.js';
import auth from '../middlerware/auth.middlerware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', auth, (req, res) => {
    res.json(req.user); // Return the authenticated user's data
  });

export default router;
