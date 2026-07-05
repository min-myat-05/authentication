import User from "../model/UserModel.js";
import { createToken } from "../helper/createToken.js";

const UserController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await User.register({ name, email, password });
      if (!process.env.JWT_SECRET) {
        await User.deleteOne({ _id: user._id });
        console.error("JWT secret is not configured. Aborting registration.");
        return res
          .status(500)
          .json({ message: "JWT secret is not configured" });
      }
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ user, token });
    } catch (error) {
      console.error("Register error:", error);
      const status = error.message === "email already exists" ? 400 : 500;
      res.status(status).json({ message: error.message || "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await User.login({ email, password });
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ user, token });
    } catch (error) {
      console.error("Login error:", error);
      const status =
        error.message === "user not exists" ||
        error.message === "password is incorrect"
          ? 400
          : 500;
      res.status(status).json({ message: error.message || "Server error" });
    }
  },
  logout: (req, res) => {
    res.cookie("jwt", "", {
      maxAge: 1,
    });
    return res.json({ message: "token not available" });
  },
};
export default UserController;
