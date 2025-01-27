import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deleteAt: {
    type: Date,
    default: null
  }
});

// Create the User model
export const UserModel = mongoose.model('User', userSchema);
export default UserModel;