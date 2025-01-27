import jwt from "jsonwebtoken";
import { appEnv } from "../../env.js";
import SessionModel from "../../model/session.mongo.js";

export async function regenerateToken(req, res) {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = req.user;

    const session = await SessionModel.findOne({ user: user._id });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const token = jwt.sign({ userId: user._id }, appEnv.JSON_WEB_TOKEN_SECRET, {
      expiresIn: appEnv.JSON_WEB_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      appEnv.JSON_WEB_TOKEN_SECRET,
      {
        expiresIn: appEnv.JSON_WEB_REFRESH_TOKEN_EXPIRY,
      }
    );
    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
