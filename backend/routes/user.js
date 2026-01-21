import { Router } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares.js";
import { User } from "../models/user.js";
const router = Router();
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({ token, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      user.p;
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      hashedPassword,
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});
export const userRoutes = router;
