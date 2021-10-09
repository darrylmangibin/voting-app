import dotenv from 'dotenv';
import colors from 'colors';

import users from './data-seeder/user.js';
import candidates from './data-seeder/candidate.js';
import User from './models/User.js';
import Candidate from './models/Candidate.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Candidate.deleteMany();

    await User.insertMany(users);
    await Candidate.insertMany(candidates);

    console.log('Data imported'.green.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Candidate.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[2] === '-i') {
  importData();
}
