import jwt from "jsonwebtoken";
import { appEnv } from "../env.js";
import User from "../model/user.mongo.js";

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
    if (!user.isVerified) {
      return res.status(401).json({ message: "User not verified" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
