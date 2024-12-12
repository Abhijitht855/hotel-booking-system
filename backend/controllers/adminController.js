import Room from "../models/roomModel.js";

export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room updated successfully", updatedRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
