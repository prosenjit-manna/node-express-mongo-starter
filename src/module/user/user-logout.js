import SessionModel from "../user/session.mongo.js";

export async function userLogout(req, res) {
  try {
   const user = req.user;
    await SessionModel.deleteMany({ user: user._id });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
