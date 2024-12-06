import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiMapPin } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";

const SearchHotel = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(1);

  const handleRoomsChange = (event) => {
    setRooms(parseInt(event.target.value));
  };

  return (
    <div className="px-40 py-5">
      <div>
        <div className="text-center">
          <h1 className="text-[50px] font-bold">Search Hotels...</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
            labore.
          </p>
        </div>

        <div className="bg-indigo-500 m-auto rounded-2xl shadow-lg mt-5">
          <div className="p-10">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl">
              <div className="flex-1">
                <label
                  htmlFor="hotel-search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hotel Search
                </label>
                <div className="flex items-center bg-gray-200 rounded-md">
                  <FiMapPin className="text-[28px] ml-2 text-slate-500" />
                  <input
                    id="hotel-search"
                    type="text"
                    placeholder="Search For Hotels"
                    className="w-full py-3 rounded-md outline-none bg-gray-200 ml-2"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <div className="flex items-center bg-gray-200 rounded-md">
                  <CiCalendar className="text-[28px] ml-2 text-slate-500" />
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => {
                      setCheckInDate(date);
                      if (checkOutDate && date >= checkOutDate) {
                        setCheckOutDate(null);
                      }
                    }}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    className="p-2  rounded-md w-full bg-gray-200 py-3 outline-none"
                    placeholderText="Select check-in date"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <div className="flex items-center bg-gray-200 rounded-md">
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate}
                    className="p-2 rounded-md w-full bg-gray-200 py-3 outline-none"
                    placeholderText="Select check-out date"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rooms
                </label>
                <div className="flex items-center bg-gray-200 rounded-md">
                  <FiUsers className="text-[28px] ml-2 text-slate-500" />
                  <select
                    value={rooms}
                    onChange={handleRoomsChange}
                    className="w-full p-2 border rounded-md bg-gray-200 py-3 outline-none text-gray-700"
                  >
                    {[1, 2, 3, 4, 5].map((room) => (
                      <option key={room} value={room} >
                        {room} {room === 1 ? "Room" : "Rooms"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button className="px-6 py-3 bg-white text-black font-bold rounded-md shadow-md hover:bg-gray-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHotel;
