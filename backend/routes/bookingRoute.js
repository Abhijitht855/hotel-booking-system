import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", authenticate, createBooking);

// Get all bookings for a user
router.get("/", authenticate, getUserBookings);

export default router;
