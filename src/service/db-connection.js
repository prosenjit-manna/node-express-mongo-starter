import mongoose from 'mongoose';
import { appEnv } from '../env.js';

export async function mongodbConnect () {
  try {
    return await mongoose.connect(appEnv.MONGO_URL);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
