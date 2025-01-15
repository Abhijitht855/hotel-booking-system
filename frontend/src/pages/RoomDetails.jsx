// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";

// const RoomDetails = () => {
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoomType, setSelectedRoomType] = useState("");

//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/rooms/${id}`);
//         setRoom(res.data);
//         setSelectedRoomType(res.data.roomType || "");
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching room details:", error);
//         setLoading(false);
//       }
//     };

//     fetchRoomDetails();
//   }, [id]);

//   if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;

//   if (!room) return <div className="text-center text-xl mt-10">Room not found</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden">
//         {/* Room Image Section */}
//         <div className="w-full md:w-1/2">
//           {room.images && room.images.length > 0 ? (
//             <img
//               src={room.images}
//               alt={room.name}
//               className="w-full h-72 md:h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-72 md:h-full bg-gray-200 flex items-center justify-center">
//               <p className="text-gray-500">No image available</p>
//             </div>
//           )}
//         </div>

//         {/* Room Details Section */}
//         <div className="w-full md:w-1/2 p-6 space-y-6">
//           {/* Header */}
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold text-gray-800">{room.name}</h1>
//             <p className="text-gray-600 mt-2">{room.location}</p>
//           </div>

//           {/* Description */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-700">Description</h2>
//             <p className="text-gray-600 mt-2">{room.description}</p>
//           </div>

//           {/* Room Details */}
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Price</h3>
//               <p className="text-gray-600 mt-1">₹{room.price} per night</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Availability</h3>
//               <p className="mt-1">
//                 {room.isBooked ? (
//                   <span className="text-green-500">Available</span>
//                 ) : (
//                   <span className="text-red-500">Not Available</span>
//                 )}
//               </p>
//             </div>
//           </div>

//           {/* Room Type Selector */}
//           <div>
//             <h3 className="text-lg font-medium text-gray-700 mb-2">Select Room Type</h3>
//             <select
//               value={selectedRoomType}
//               onChange={(e) => setSelectedRoomType(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Single">Single</option>
//               <option value="Double">Double</option>
//               <option value="Suite">Suite</option>
//               <option value="Family">Family</option>
//             </select>
//           </div>

//           {/* Booking Button */}
//           <div>
//             <button
//               className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition ${
//                 room.isBooked
//                   ? "bg-blue-500 hover:bg-blue-600"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//               disabled={!room.isBooked}
//             >
//               {room.isBooked ? "Book Now" : "Unavailable"}
//             </button>
//           </div>

//           {/* Back Button */}
//           <div className="text-center md:text-left">
//             <Link
//               to="/rooms"
//               className="text-blue-500 underline hover:text-blue-600 transition"
//             >
//               Back to Rooms
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;

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
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Room Image Section */}
        <div className="w-full md:w-1/2 h-72 md:h-auto">
          {room.images && room.images.length > 0 ? (
            <img
              src={room.images}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        {/* Room Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{room.name}</h1>
            <p className="text-gray-500 mt-2">{room.location}</p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Description</h2>
            <p className="text-gray-600 mt-2">{room.description}</p>
          </div>

          {/* Room Details */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Price</h3>
              <p className="text-gray-600 mt-1">₹{room.price} per night</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Availability</h3>
              <p className="mt-1">
                {room.isBooked ? (
                  <span className="text-green-500 font-medium">Available</span>
                ) : (
                  <span className="text-red-500 font-medium">Not Available</span>
                )}
              </p>
            </div>
          </div>

          {/* Room Type Selector */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Select Room Type</h3>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
            </select>
          </div>

          {/* Booking Button */}
          <div>
            <button
              className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition ${
                room.isBooked
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!room.isBooked}
            >
              {room.isBooked ? "Book Now" : "Unavailable"}
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-4">
            <Link
              to="/rooms"
              className="inline-block text-sm px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
