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
        setSelectedRoomType(res.data.roomType || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;

  if (!room) return <div className="text-center text-xl mt-10">Room not found</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-8">
        {/* Room Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">{room.name}</h1>
          <p className="text-gray-600 mt-2 text-lg">{room.location}</p>
        </div>

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

        {/* Room Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Description</h2>
            <p className="text-gray-600 mt-2">{room.description}</p>
          </div>

          {/* Pricing and Availability */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Details</h2>
            <p className="mt-2">
              <strong className="text-gray-800">Price:</strong> ₹{room.price}
            </p>
            <p className="mt-2">
              <strong className="text-gray-800">Availability:</strong>{" "}
              {room.isBooked ? (
                <span className="text-green-500">Available</span>
              ) : (
                <span className="text-red-500">Not Available</span>
              )}
            </p>
          </div>
        </div>

        {/* Room Type Selector */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Select Room Type</h2>
          <select
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
          </select>
        </div>

        {/* Booking Button */}
        <div className="text-center">
          <button
            className={`w-full md:w-auto px-6 py-3 rounded-lg text-white font-semibold transition ${
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
        <div className="text-center">
          <Link
            to="/rooms"
            className="text-blue-500 underline hover:text-blue-600 transition"
          >
            Back to Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
