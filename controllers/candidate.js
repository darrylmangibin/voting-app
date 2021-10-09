import asyncHandler from 'express-async-handler';
import Candidate from '../models/Candidate.js';

const getCandidates = asyncHandler(async (req, res, next) => {
  const candidates = await Candidate.find({});

  res.status(200).json(candidates);
});

const getCandidateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const candidate = await Candidate.findById(id);

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

export {
  getCandidates,
  createCandidate,
  getCandidateById,
  updateCandidateById,
};
