// import express from 'express'
// import "dotenv/config";
// import connectDB from './config/mongodb.js'
// import userRouter from './routes/userRoute.js';

// const app=express()
// connectDB();

// const PORT = 5000

// //middlewares
// app.use(express.json());


// app.use('/api/user',userRouter)


// app.get('/',(req,res)=>{
//     res.send('hello from server')
// })

// app.listen(PORT,()=>{
//     console.log(`server running on ${PORT}`);
    
// })

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/userRoute.js";
import roomRoutes from "./routes/roomsRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Define routes
app.use("/api/auth", authRoutes);   // Authentication routes
app.use("/api/rooms", roomRoutes);  // Room management routes
app.use("/api/admin", adminRoutes); // Admin routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
