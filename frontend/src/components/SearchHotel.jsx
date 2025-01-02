import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchHotel = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [location, setLocation] = useState("");

  return (
    <div className="relative bg-orange-400 pb-10">
      {/* Curved Bottom Section */}
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            d="M0,224L1440,96L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-white">
          Book Hotels and Homestays
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          {/* Form Inputs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Location Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Where to
              </label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none text-lg font-medium"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Check-in
              </label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                className="w-full px-4 py-2 border rounded-lg outline-none text-lg font-medium"
                placeholderText="Select date"
              />
            </div>

            {/* Check-out Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Check-out
              </label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                minDate={checkInDate}
                className="w-full px-4 py-2 border rounded-lg outline-none text-lg font-medium"
                placeholderText="Select date"
              />
            </div>

            {/* Guests & Rooms */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Guests & Rooms
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-1/2 px-4 py-2 border rounded-lg outline-none text-lg font-medium"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Adult{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-1/2 px-4 py-2 border rounded-lg outline-none text-lg font-medium"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Room{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-orange-500 text-white text-lg font-bold px-8 py-3 rounded-full shadow-md hover:bg-orange-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHotel;
