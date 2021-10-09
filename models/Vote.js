import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    unique: true,
  },
});

const Vote = mongoose.model('Vote', VoteSchema);

export default Vote;
