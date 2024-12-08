import Room from "../models/roomModel.js";

// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new room (Admin only)
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

// Update room details (Admin only)
export const updateRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    res.status(200).json({ message: "Room updated", updatedRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a room (Admin only)
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
