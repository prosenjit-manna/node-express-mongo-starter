import bcrypt from "bcrypt";
import { UserModel } from "../../model/user.mongo.js";
import { sendEmail } from "../../service/send-email.js";
import jwt from "jsonwebtoken";
import { appEnv } from "../../env.js";
export async function userSignup(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();
    const token = jwt.sign(
          { userId: user._id },
          appEnv.JSON_WEB_TOKEN_SECRET,
          {
            expiresIn: appEnv.JSON_WEB_TOKEN_EXPIRY,
          }
        );
    await sendEmail({ template: 'verification', to: email, subject: 'Signup Email Verification' }, { token });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
