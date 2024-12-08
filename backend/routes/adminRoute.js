import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";

const router = express.Router();

// Create a new room (Admin only)
router.post("/create-room", authenticate, authorizeAdmin, createRoom);

// Update room details (Admin only)
router.put("/update-room/:id", authenticate, authorizeAdmin, updateRoom);

// Delete a room (Admin only)
router.delete("/delete-room/:id", authenticate, authorizeAdmin, deleteRoom);

export default router;
