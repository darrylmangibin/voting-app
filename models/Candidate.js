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

CandidateSchema.pre('remove', async function () {
  await mongoose.model('Vote').deleteMany({ candidate: this._id });
});

CandidateSchema.virtual('votes', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'candidate',
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;
