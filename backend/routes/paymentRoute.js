import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createPaymentIntent } from "../controllers/paymentController.js";

const router = express.Router();

// Payment Routes
router.post("/create-payment-intent", authenticate, createPaymentIntent);

export default router;
