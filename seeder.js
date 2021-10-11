const dotenv = require('dotenv');
const colors = require('colors');

const users = require('./data-seeder/user');
const candidates = require('./data-seeder/candidate');
const User = require('./models/User');
const Candidate = require('./models/Candidate');
const Vote = require('./models/Vote');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Candidate.deleteMany();
    await Vote.deleteMany();

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
    await Vote.deleteMany();

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
