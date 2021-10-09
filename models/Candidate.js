import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CandidateSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;

  next();
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;
