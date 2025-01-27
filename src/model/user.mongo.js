import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
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