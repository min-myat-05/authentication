import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
export const createToken = (_id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT secret not configured");
  return jwt.sign({ _id }, secret, { expiresIn: maxAge });
};
