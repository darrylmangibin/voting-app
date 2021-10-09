import express from 'express';

import {
  getCandidates,
  createCandidate,
  getCandidateById,
  updateCandidateById,
} from '../controllers/candidate.js';
import { auth, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(auth, getCandidates).post(auth, admin, createCandidate);

router
  .route('/:id')
  .get(auth, getCandidateById)
  .put(auth, admin, updateCandidateById);

export default router;
