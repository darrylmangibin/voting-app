const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        async validator(email) {
          if (!validator.isEmail(email)) {
            throw new Error('Email is invalid');
          }
        },
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must atleast 6 characters'],
      trim: true,
    },
    role: {
      type: String,
      default: 'voter',
      enum: ['admin', 'voter'],
    },
    fullName: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  this.fullName = `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.generateToken = function () {
  const payload = {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    _id: this._id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(this);
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.virtual('vote', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'voter',
  justOne: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
