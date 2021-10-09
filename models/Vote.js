import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
});

const Vote = mongoose.model('Vote', VoteSchema);

export default Vote;
