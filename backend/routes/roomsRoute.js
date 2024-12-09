import express from "express";
import Room from "../models/roomModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
