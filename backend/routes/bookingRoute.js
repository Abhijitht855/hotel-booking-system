import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js"; // Ensure the authenticate middleware is used
import { bookRoom, getBookingsByUser, getAllBookings } from "../controllers/bookingController.js"; // Booking controller methods

const router = express.Router();

// Route to book a room (User must be authenticated)
router.post("/book-room", authenticate, bookRoom);

// Route to get all bookings for the logged-in user (Authenticated users only)
router.get("/user-bookings", authenticate, getBookingsByUser);

// Route to get all bookings (Admin can access this route)
router.get("/all-bookings", authenticate, getAllBookings);

export default router;
