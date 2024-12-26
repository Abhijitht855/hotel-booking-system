// // Install the necessary packages before using:
// // npm install axios react-router-dom

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

// const RoomsList = () => {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/rooms");
//         setRooms(res.data);
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Rooms</h1>
//       <ul>
//         {rooms.map((room) => (
//           <li key={room._id} className="mb-2">
//             <Link to={`/rooms/${room._id}`} className="text-blue-500 underline">
//               {room.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RoomsList;














import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        setRooms(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Link
              to={`/rooms/${room._id}`}
              className="block text-center text-blue-500 hover:underline"
            >
              {/* Display image */}
              <div className="mb-4">
                <img
                  src={room.images} // Assuming the image URL is in `imageUrl`
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
              {/* Add more room details if necessary */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
