import mongoose, { Schema } from 'mongoose';
import User from '../user/user.mongo.js';

const ChatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  senderId: { type: Schema.Types.ObjectId, ref: User, required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: User, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
