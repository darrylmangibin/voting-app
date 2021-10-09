import express from 'express';

import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from '../controllers/user.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(auth, getCurrentUserProfile)
  .put(auth, updateCurrentUserProfile);

export default router;
