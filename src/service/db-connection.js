import mongoose from 'mongoose';

export async function mongodbConnect () {
  try {
    return await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
