import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createRoom, updateRoom, deleteRoom, uploadRoomImages, registerAdmin, loginAdmin} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
// Admin Routes
router.post("/create-room", authenticate, authorizeAdmin, uploadRoomImages, createRoom);
router.post("/update-room/:id", authenticate, authorizeAdmin, uploadRoomImages, updateRoom);
router.delete("/delete-room/:id", authenticate, authorizeAdmin, deleteRoom);



export default router;
