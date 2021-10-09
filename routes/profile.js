import express from 'express';

import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUserProfile,
} from '../controllers/user.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(auth, getCurrentUserProfile)
  .put(auth, updateCurrentUserProfile)
  .delete(auth, deleteCurrentUserProfile);

export default router;
