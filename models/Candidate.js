import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema(
  {
    fistName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;
