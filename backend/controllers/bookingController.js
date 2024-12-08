import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    // Find the room being booked
    const room = await Room.findById(roomId);
    if (!room || !room.available) {
      return res.status(400).json({ message: "Room is not available." });
    }

    // Create the booking
    const booking = new Booking({
      user: req.user.id, // User ID from token
      room: roomId,
      checkInDate,
      checkOutDate,
    });

    await booking.save();

    // Mark the room as unavailable
    room.available = false;
    await room.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("room");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
