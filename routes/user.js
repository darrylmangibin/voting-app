import express from 'express';

import {
  getUsers,
  registerUser,
  getUserById,
  loginUser,
} from '../controllers/user.js';
import { auth, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(auth, admin, getUsers).post(registerUser);

router.route('/:id').get(auth, admin, getUserById);

router.route('/login').post(loginUser);

export default router;
