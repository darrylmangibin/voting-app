import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import path from 'path';

import connectDB from './config/db.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/user.js';
import profileRoutes from './routes/profile.js';
import candidateRoutes from './routes/candidate.js';
import voteRoutes from './routes/vote.js';

dotenv.config();

connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5001;

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, 'client', 'build', 'index.html')
  );
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server running in mode ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
