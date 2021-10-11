const express = require('express');

const {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUserProfile,
} = require('../controllers/user');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(auth, getCurrentUserProfile)
  .put(auth, updateCurrentUserProfile)
  .delete(auth, deleteCurrentUserProfile);

module.exports = router;
