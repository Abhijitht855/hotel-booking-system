// import mongoose from "mongoose";

// const connectDB = async () => {
//     mongoose.connection.on("connected", () => {
//       console.log("DB connected successfully.");
//     });
  
//     await mongoose.connect(`${process.env.MONGO_URI}/hotel`);
//   };
  
//   export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI + "/hotel-booking-system" ,{
    });
    console.log("DB connected successfully.");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
