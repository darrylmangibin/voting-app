import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select('-password');

  res.json(users);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
  console.log(req.user)
  const user = await User.findById(req.user.id.toString()).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  } else {
    res.status(200).json(user);
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }

  let user = await User.create({ firstName, lastName, email, password });

  if (user) {
    const token = user.generateToken();

    res.status(201).json({ token });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    res.status(404);
    throw new Error('Invalid email or password');
  }

  const token = user.generateToken();

  res.status(200).json({ token });
});

export {
  getUsers,
  registerUser,
  getUserById,
  loginUser,
  getCurrentUserProfile,
};
