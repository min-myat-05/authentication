import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
export default mongoose.model("User", userSchema);
