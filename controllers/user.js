import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find({}).select('-password');

  users = users.filter((user) => user.role !== 'admin');

  res.json(users);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id.toString()).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

const deleteCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);

  if (!deletedUser) {
    res.status(400);
    throw new Error('User not found');
  }

  res.status(200).json(deletedUser);
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }

  let user = await User.create({ firstName, lastName, email, password });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  const token = user.generateToken();

  res.status(201).json({ token });
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
  updateCurrentUserProfile,
  deleteCurrentUserProfile,
};
