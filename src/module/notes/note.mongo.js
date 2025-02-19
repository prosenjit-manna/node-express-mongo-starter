import mongoose from 'mongoose';
import User from '../user/user.mongo.js';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
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

export const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel;
