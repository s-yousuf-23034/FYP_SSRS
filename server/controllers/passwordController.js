import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendPasswordResetEmail } from "../utils/emailUtils.js";
import { generateToken } from "../utils/tokenUtils.js";
import bcrypt from "bcrypt";

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const token = generateToken(user._id);

    // Send password reset email
    await sendPasswordResetEmail(user.email, token);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = passwordHash;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
