import React, { useState } from "react";
import axios from "axios";

const RoomBookingForm = ({ roomId }) => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    totalAmount: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          roomId,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error booking room");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Book Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Check-In Date:</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label>Check-Out Date:</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label>Guests:</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="block w-full border rounded p-2"
            min="1"
            required
          />
        </div>
        <div>
          <label>Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="block w-full border rounded p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Book Now
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default RoomBookingForm;
