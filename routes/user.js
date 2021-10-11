const express = require('express');

const {
  getUsers,
  registerUser,
  getUserById,
  loginUser,
} = require('../controllers/user');
const { auth, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(auth, admin, getUsers).post(registerUser);

router.route('/:id').get(auth, admin, getUserById);

router.route('/login').post(loginUser);

module.exports = router;
