import Booking from "../models/bookingModel.js";
import Room from "../models/roomModel.js";

export const bookRoom = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guests, totalAmount } = req.body;

    // Validate the request body
    if (!roomId || !checkIn || !checkOut || !guests || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Create the booking
    const booking = new Booking({
      user: req.user.id,
      room: roomId,
      checkIn,
      checkOut,
      guests,
      totalAmount,
    });

    await booking.save();

    res.status(201).json({
      message: "Room booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("room");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user room");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
