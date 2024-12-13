import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import api from "../Api/axios";

const RoomBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get("/rooms");
        setRooms(response.data);
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleBooking = async () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await api.post("/book-room", {
        roomId: selectedRoom,
        checkIn,
        checkOut,
        user: user.id,
      });
      alert("Booking Successful!");
      navigate("/");
    } catch (error) {
      alert("Error while booking the room");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Room</h1>
      <select
        onChange={(e) => setSelectedRoom(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room._id} value={room._id}>
            {room.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Check-In Date"
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Check-Out Date"
      />
      <button
        onClick={handleBooking}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomBooking;
