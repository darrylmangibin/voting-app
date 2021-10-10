import asyncHandler from 'express-async-handler';
import Candidate from '../models/Candidate.js';

const getCandidates = asyncHandler(async (req, res, next) => {
  const candidates = await Candidate.find({}).populate({
    path: 'votes',
    populate: {
      path: 'voter',
      select: '-password'
    },
  });

  res.status(200).json(candidates);
});

const getCandidateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const candidate = await Candidate.findById(id).populate({
    path: 'votes',
    populate: {
      path: 'voter',
      select: '-password'
    },
  });

  if (candidate) {
    res.status(200).json(candidate);
  } else {
    res.status(404);
    throw new Error('Candidate not found');
  }
});

const createCandidate = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, shortName } = req.body;

  const candidateShortNameExist = await Candidate.findOne({ shortName });

  if (candidateShortNameExist) {
    res.status(400);
    throw new Error('Short name already exist');
  }

  const createdCandidate = await Candidate.create({
    firstName,
    lastName,
    shortName,
  });

  if (createdCandidate) {
    res.status(201).json(createdCandidate);
  } else {
    res.status(400);
    throw new Error('Invalid candidate data');
  }
});

const updateCandidateById = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, shortName } = req.body;

  const updatedCandidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, shortName },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedCandidate);
});

const deleteCandidateById = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    res.status(400);
    throw new Error('Candidate not found');
  }

  const deletedCandidate = await candidate.remove();

  res.status(200).json(deletedCandidate);
});

export {
  getCandidates,
  createCandidate,
  getCandidateById,
  updateCandidateById,
  deleteCandidateById,
};
