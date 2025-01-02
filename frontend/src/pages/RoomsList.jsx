import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState([
    "Beachfront",
    "Free Cancellation",
    "Free Breakfast",
    "Couple Friendly",
    "Pay at Hotel",
  ]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className=" px-10">
      <div className="flex flex-col md:flex-row container mx-auto p-10 bg-gray-100 rounded-lg shadow-lg">
        {/* Filters Section */}
        <div className="md:w-1/4 p-6 border-black border-2">
          <h2 className="text-lg font-semibold mb-4">Popular Filters</h2>
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`filter-${index}`}
                  className="mr-2"
                />
                <label htmlFor={`filter-${index}`} className="text-gray-700">
                  {filter}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 p-6">
          {/* Sorting Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Rooms</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border rounded hover:bg-gray-100">
                Most Popular
              </button>
              <button className="px-4 py-2 border rounded hover:bg-gray-100">
                Price - Low to High
              </button>
              <button className="px-4 py-2 border rounded hover:bg-gray-100">
                Price - High to Low
              </button>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={`/rooms/${room._id}`} className="block">
                  {/* Flex Container for Image and Details */}
                  <div className="flex">
                    {/* Room Image */}
                    <div className="w-2/4">
                      <img
                        src={room.images}
                        alt={room.name}
                        className="w-full h-48 object-cover rounded-l-lg"
                      />
                      {room.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {room.discount}% Off
                        </span>
                      )}
                    </div>
                    {/* Room Details */}
                    <div className="p-6 w-2/4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {room.description}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>City:</strong> {room.city}
                      </p>
                      <div className="text-sm text-gray-700">
                        <p className="text-xl font-semibold">
                          Price: ₹{room.price}
                        </p>
                        <p className="text-green-600">{room.offer}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsList;
