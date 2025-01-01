import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import bodyParser from 'body-parser';
import cors from "cors";


import authRoutes from "./routes/authRoute.js";
import roomRoutes from "./routes/roomsRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import bookingRoutes from './routes/bookingRoute.js'
import paymentRoutes from './routes/paymentRoute.js'


dotenv.config();
connectDB();

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());



app.use('/images', express.static( '/uploads/images'));

app.use("/api/auth", authRoutes); 
app.use("/api/admin", adminRoutes); 
app.use("/api/rooms", roomRoutes);  
app.use("/api/bookings", bookingRoutes); 
app.use("/api/payments", paymentRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
