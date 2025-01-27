import User from "../../model/user.mongo.js";

export async function VerifySignup(req, res) {
  const id = req.userId;
  console.log('Received ID:', id); // Log the received ID
  try {
    const user = await User.findById(id);
    console.log('User found:', user); // Log the found user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isVerified = true;
    await user.updateOne(user);
    return res.json(user);
  } catch (e) {
    console.error('Error fetching user:', e); // Log the error
    return res.status(500).json({ message: e.message });
  }
}