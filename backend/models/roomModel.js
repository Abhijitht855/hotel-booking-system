import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  available: { type: Boolean, default: true },
  capacity: { type: Number, required: true },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
