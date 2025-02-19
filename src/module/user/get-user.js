import User from "../user/user.mongo.js";

export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (e) {
    console.error('Error fetching user:', e); // Log the error
    return res.status(500).json({ message: e.message });
  }
}