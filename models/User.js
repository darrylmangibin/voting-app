import mongoose from 'mongoose';
import validator from 'express-validator';
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  this.fullName = `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', UserSchema);

export default User;
