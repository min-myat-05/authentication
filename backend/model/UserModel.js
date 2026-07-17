import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.statics.register = async function ({ name, email, password }) {
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(password, salt);
  let user = await this.create({
    name,
    email,
    password: hashValue,
  });
  return user;
};

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("user not exists");
  }
  let isCorrect = await bcrypt.compare(password, user.password);
  if (isCorrect) {
    return user;
  } else {
    throw new Error("password is incorrect");
  }
};

// Generate a password-reset token, save its hash and expiry, and return the plain token
userSchema.statics.forgotPassword = async function ({ email }) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("user not exists");
  }
  const token = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();
  return token;
};

// Reset password using plain token and new password
userSchema.statics.resetPassword = async function ({ token, newPassword }) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await this.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("invalid or expired token");
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return user;
};

export default mongoose.model("User", userSchema);
