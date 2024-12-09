import Booking from "../models/bookingModel.js";
import Room from "../models/roomModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const { roomId, checkIn, checkOut, guests } = req.body;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is available during the selected dates (You can improve this logic)
    const booking = new Booking({ userId: req.user.id, roomId, checkIn, checkOut, guests });
    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate("roomId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
