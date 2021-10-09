import express from 'express';

import { createVote } from '../controllers/vote.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(auth, createVote);

export default router;
