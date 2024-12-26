import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createRoom, updateRoom, deleteRoom, uploadRoomImages } from "../controllers/adminController.js";

const router = express.Router();

// Admin Routes
router.post("/create-room", authenticate, authorizeAdmin, uploadRoomImages, createRoom);
router.post("/update-room/:id", authenticate, authorizeAdmin, uploadRoomImages, updateRoom);
router.delete("/delete-room/:id", authenticate, authorizeAdmin, deleteRoom);

export default router;
