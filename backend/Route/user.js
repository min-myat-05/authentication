import express from "express";
import UserController from "../controller/UserController.js";
import { body, validationResult } from "express-validator";
import handelError from "../middleware/handelError.js";

const router = express.Router();

router.post("/logout", UserController.logout);

router.post(
  "/register",
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  handelError,
  UserController.register,
);

router.post("/login", UserController.login);

export default router;
