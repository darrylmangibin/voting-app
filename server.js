import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    `Server running in mode ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
