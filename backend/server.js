
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/userRoute.js";
import roomRoutes from "./routes/roomsRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import bodyParser from 'body-parser';
import bookingRoute from './routes/bookingRoute.js'

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/rooms", roomRoutes);  
app.use("/api/admin", adminRoutes); 
app.use("/api/book", bookingRoute); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
