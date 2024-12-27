import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const user = new User({ name, email, password,role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ token, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password match the admin credentials in .env
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // If the credentials match, generate a JWT token for the admin
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({
      success: true,
      message: "Admin logged in successfully",
      token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
};