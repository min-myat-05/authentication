import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db/ConnectDB.js";
import user from "./Route/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/user", user);

const PORT = process.env.PORT || 5000;

// Connect to DB first
await connectDB();

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

app.get("/set-cookie", (req, res) => {
  res.cookie("token", "minmyat");
  res.cookie("key", "value", { httpOnly: true });
  res.send("Cookie has been set");
});

app.get("/get-cookie", (req, res) => {
  const token = req.cookies;
  res.json(token);
});
