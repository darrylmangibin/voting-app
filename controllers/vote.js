import asyncHandler from 'express-async-handler';

import Vote from '../models/Vote.js';
import User from '../models/User.js';
import Candidate from '../models/Candidate.js';

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

export { createVote };
