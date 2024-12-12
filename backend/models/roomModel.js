import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Price per night
  city: { type: String, required: true }, // City where the room is located
  capacity: { type: Number, required: true }, // Number of guests allowed
  isBooked: { type: Boolean, default: false }, // Availability status
  createdAt: { type: Date, default: Date.now }, // Record creation time
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
