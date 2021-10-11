const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const candidateRoutes = require('./routes/candidate');
const voteRoutes = require('./routes/vote');

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
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server running in mode ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
