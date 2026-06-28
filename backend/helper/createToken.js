import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
export const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: maxAge });
};
