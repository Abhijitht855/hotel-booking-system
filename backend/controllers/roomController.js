import Room from "../models/roomModel.js";
import mongoose from "mongoose";

// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createRoom = async (req, res) => {
  try {
    const { name, description, price, city, capacity } = req.body;
    const room = new Room({ name, description, price, city, capacity });
    await room.save();
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateRoom = async (req, res) => {
  const roomId = req.params.id;

  // Check if the roomId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ message: "Invalid room ID" });
  }

  try {
    // Find the room by its ID
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Update the room with the new data from req.body
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });

    // Return success response
    res.status(200).json({ message: "Room updated", updatedRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
