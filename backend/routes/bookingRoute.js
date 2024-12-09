import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";

const router = express.Router();


router.post("/book-room", authenticate, createBooking)


router.get("/", authenticate, getUserBookings)

export default router
