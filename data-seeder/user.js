const bcrypt = require('bcryptjs');

module.exports = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'voter',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'voter',
  },
  {
    firstName: 'Steve',
    lastName: 'Smith',
    email: 'steve@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'voter',
  },
  {
    firstName: 'Greg',
    lastName: 'Harris',
    email: 'greg@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
];
