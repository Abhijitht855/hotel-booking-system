import Booking from "../models/bookingModel.js";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";

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

export const addBookedRoom = async (req, res) => {
  const { userId, roomId, checkInDate, checkOutDate } = req.body;

  try {
    // Validate user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate room ID
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Ensure dates are valid
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn >= checkOut) {
      return res
        .status(400)
        .json({ message: "Check-in date must be before check-out date" });
    }

    // Ensure room is available for the selected dates
    const isRoomAvailable = room.bookings.every(
      (booking) =>
        checkOut <= new Date(booking.checkInDate) ||
        checkIn >= new Date(booking.checkOutDate)
    );

    if (!isRoomAvailable) {
      return res.status(400).json({ message: "Room is not available for the selected dates" });
    }

    // Add the room to user's bookedRooms
    user.bookedRooms.push({ roomId, checkInDate, checkOutDate });
    await user.save();

    // Update room's booking history
    room.bookings.push({ userId, checkInDate, checkOutDate });
    await room.save();

    res.status(200).json({ message: "Room booked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
