import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getUsers = asyncHandler( async (req, res, next) => {
  const users = await User.find({});

  res.json(users);
});

export { getUsers };
