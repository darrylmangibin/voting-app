import express from 'express';

import { getCurrentUserProfile } from '../controllers/user.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(auth, getCurrentUserProfile);

export default router;
