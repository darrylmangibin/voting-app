const express = require('express');

const { createVote } = require('../controllers/vote');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(auth, createVote);

module.exports = router;
