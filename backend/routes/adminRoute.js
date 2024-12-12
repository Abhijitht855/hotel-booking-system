import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createRoom, updateRoom, deleteRoom } from "../controllers/adminController.js";

const router = express.Router();

// Admin Routes
router.post("/create-room", authenticate, authorizeAdmin, createRoom);
router.post("/update-room/:id", authenticate, authorizeAdmin, updateRoom);
router.delete("/delete-room/:id", authenticate, authorizeAdmin, deleteRoom);

export default router;

