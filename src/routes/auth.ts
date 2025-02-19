import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import { validateSignup } from "../utils/validateSignup";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = new UserModel({ ...req.body });
    validateSignup(req);
    let newUser = await user.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.json({
      status: 200,
      message: "User Saved Successfully",
      data: {
        token,
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found!");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password please login again!");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.json({
      message: "Login successfull",
      data: {
        token,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    res.cookie("token", "");
    res.json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export { router };
