import mongoose from 'mongoose';
import User from '../user/user.mongo.js';

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleteAt: {
    type: Date,
    default: null
  }
});

export const SessionModel = mongoose.model('Session', sessionSchema);
export default SessionModel;
