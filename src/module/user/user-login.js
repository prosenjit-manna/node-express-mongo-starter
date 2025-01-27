import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/user.mongo.js";
import { appEnv } from "../../env.js";
import SessionModel from "../../model/session.mongo.js";

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }, { password: 1, isVerified: 1 });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    

    if (!user.isVerified) {
      return res.status(401).json({ message: "User not verified" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user._id },
      appEnv.JSON_WEB_TOKEN_SECRET,
      {
        expiresIn: appEnv.JSON_WEB_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      appEnv.JSON_WEB_TOKEN_SECRET,
      {
        expiresIn: appEnv.JSON_WEB_REFRESH_TOKEN_EXPIRY,
      }
    );
    await SessionModel.create({ user: user._id });
    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
