const express = require('express');

const {
  getCandidates,
  createCandidate,
  getCandidateById,
  updateCandidateById,
  deleteCandidateById,
} = require('../controllers/candidate');
const { auth, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(auth, getCandidates).post(auth, admin, createCandidate);

router
  .route('/:id')
  .get(auth, getCandidateById)
  .put(auth, admin, updateCandidateById)
  .delete(auth, admin, deleteCandidateById);

module.exports = router;
