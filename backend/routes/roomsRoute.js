import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import Room from "../models/roomModel.js";

const router = express.Router();

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
