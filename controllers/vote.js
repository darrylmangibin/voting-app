const asyncHandler = require('express-async-handler');

const Vote = require('../models/Vote');
const User = require('../models/User');
const Candidate = require('../models/Candidate');

const createVote = asyncHandler(async (req, res, next) => {
  const { candidate } = req.body;

  const user = await User.findById(req.user.id);

  const candidateExist = await Candidate.findById(candidate);

  if (!candidateExist) {
    res.status(400);
    throw new Error('Candidate not found');
  }

  const createdVote = await Vote.create({ voter: user.id, candidate });

  if (!createdVote) {
    res.status(400);
    throw new Error('Invalid vote date');
  }

  res.status(201).json(createdVote);
});

module.exports = { createVote };
