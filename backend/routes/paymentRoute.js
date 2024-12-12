import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { processPayment } from "../controllers/paymentController.js";

const router = express.Router();

// Payment Routes
router.post("/create-payment-intent", authenticate, processPayment);

export default router;
