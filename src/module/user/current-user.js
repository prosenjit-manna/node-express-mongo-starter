import User from "../../model/user.mongo.js";

export async function currentUser(req, res) {
  const id = req.userId;
  console.log('User ID:', req.userId); // Log the received ID
  try {
    const user = await User.findById(id);
    console.log('User found:', user); // Log the found user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (e) {
    console.error('Error fetching user:', e); // Log the error
    return res.status(500).json({ message: e.message });
  }
}