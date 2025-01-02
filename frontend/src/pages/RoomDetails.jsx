import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(res.data);
        setSelectedRoomType(res.data.roomType || ""); // Set default room type if available
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  if (!room) return <div className="text-center text-xl">Room not found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">{room.name}</h1>

        {/* Room Image */}
        {room.images && room.images.length > 0 ? (
          <img
            src={room.images}
            alt={room.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        {/* Room Type Dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <label className="block text-lg font-medium text-gray-700 mb-2">Room Type</label>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
            </select>
          </div>
        </div>

        {/* Room Details */}
        <div className="text-gray-700 space-y-4">
          <p className="text-lg">
            <strong>Description:</strong> {room.description}
          </p>
          <p className="text-lg">
            <strong>Price:</strong> ₹{room.price}
          </p>
          <p className="text-lg">
            <strong>Availability:</strong>{" "}
            {room.isBooked ? (
              <span className="text-green-500">Available</span>
            ) : (
              <span className="text-red-500">Not Available</span>
            )}
          </p>
        </div>

        {/* Booking Button */}
        <div className="mt-6 flex justify-center">
          <button
            className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
              room.isBooked
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!room.isBooked}
          >
            {room.isBooked ? "Book Now" : "Unavailable"}
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <Link to="/rooms" className="text-blue-500 underline hover:text-blue-600">
            Back to Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
