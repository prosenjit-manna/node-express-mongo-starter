import jwt from "jsonwebtoken";
import { appEnv } from "../env.js";
import User from "../module/user/user.mongo.js";
import SessionModel from "../module/user/session.mongo.js";

export async function authMiddleWare(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(
      token?.replace("Bearer ", ""),
      appEnv.JSON_WEB_TOKEN_SECRET
    );
    req.userId = decoded.userId;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const session = await SessionModel.findOne({ user: req.userId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
}
