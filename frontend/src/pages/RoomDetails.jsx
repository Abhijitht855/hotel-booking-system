import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!room) return <div>Room not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{room.name}</h1>
        
        {/* Image */}
        {room.images && room.images.length > 0 ? (
          <img
            src={`http://localhost:5000${room.images}`}
            alt={room.name}
            className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        <div className="text-gray-700 space-y-4">
          <p className="text-lg">
            <strong>Description:</strong> {room.description}
          </p>
          <p className="text-lg">
            <strong>Price:</strong> ${room.price}
          </p>
          <p className="text-lg">
            <strong>Availability:</strong> {room.available ? (
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
              room.available
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!room.available}
          >
            {room.available ? "Book Now" : "Unavailable"}
          </button>
        </div>

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
