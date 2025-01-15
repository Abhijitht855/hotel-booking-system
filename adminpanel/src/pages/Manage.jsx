
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Manage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     city: "",
//     capacity: "",
//   });
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [editRoomId, setEditRoomId] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   // Axios instance
//   const axiosInstance = axios.create({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // Fetch rooms
//   useEffect(() => {
//     if (token) {
//       setIsAuthenticated(true);
//       fetchRooms();
//     }
//   }, [token]);

//   const fetchRooms = async () => {
//     try {
//       const response = await axiosInstance.get("http://localhost:5000/api/rooms");
//       setRooms(response.data);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//       if (error.response && error.response.status === 401) {
//         alert("Unauthorized! Please log in again.");
//         handleLogout();
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setSelectedImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
//     Array.from(selectedImages).forEach((file) => formDataToSend.append("images", file));

//     try {
//       if (editRoomId) {
//         await axiosInstance.put(
//           `http://localhost:5000/api/admin/update-room/${editRoomId}`,
//           formDataToSend
//         );
//         alert("Room updated successfully!");
//       } else {
//         await axiosInstance.post(
//           "http://localhost:5000/api/admin/create-room",
//           formDataToSend
//         );
//         alert("Room created successfully!");
//       }
//       fetchRooms();
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         city: "",
//         capacity: "",
//       });
//       setSelectedImages([]);
//       setEditRoomId(null);
//     } catch (error) {
//       console.error("Error saving room:", error);
//       alert("Something went wrong.");
//     }
//   };

//   const handleEdit = (room) => {
//     setEditRoomId(room._id);
//     setFormData({
//       name: room.name,
//       description: room.description,
//       price: room.price,
//       city: room.city,
//       capacity: room.capacity,
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`http://localhost:5000/api/admin/delete-room/${id}`);
//       alert("Room deleted successfully!");
//       fetchRooms();
//     } catch (error) {
//       console.error("Error deleting room:", error);
//       alert("Something went wrong.");
//     }
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/admin-login", loginData);
//       const { token } = response.data;
//       localStorage.setItem("token", token);
//       setToken(token);
//       setIsAuthenticated(true);
//       alert("Login successful!");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setIsAuthenticated(false);
//     setRooms([]);
//     alert("Logged out successfully.");
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="container mx-auto p-8">
//         <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
//         <form onSubmit={handleLogin} className="max-w-md mx-auto">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={loginData.email}
//             onChange={handleLoginChange}
//             className="w-full p-2 border border-gray-300 rounded mb-4"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={loginData.password}
//             onChange={handleLoginChange}
//             className="w-full p-2 border border-gray-300 rounded mb-4"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Room Manager</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Room Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="capacity"
//             placeholder="Capacity"
//             value={formData.capacity}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="file"
//             multiple
//             onChange={handleImageChange}
//             className="p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
//         >
//           {editRoomId ? "Update Room" : "Create Room"}
//         </button>
//       </form>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {rooms.map((room) => (
//           <div key={room._id} className="p-4 border rounded shadow">
//             <h2 className="text-lg font-bold">{room.name}</h2>
//             <p>{room.description}</p>
//             <p>Price: {room.price}</p>
//             <p>City: {room.city}</p>
//             <p>Capacity: {room.capacity}</p>
//             {room.images && (
//               <div className="flex gap-2 mt-2">
//                 {room.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={`http://localhost:5000/${image}`}
//                     alt={`Room ${index + 1}`}
//                     className="w-16 h-16 object-cover"
//                   />
//                 ))}
//               </div>
//             )}
//             <div className="mt-4 flex gap-2">
//               <button
//                 onClick={() => handleEdit(room)}
//                 className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(room._id)}
//                 className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Manage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Manage = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    city: "",
    capacity: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [editRoomId, setEditRoomId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Axios instance
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch rooms
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchRooms();
    }
  }, [token]);

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
        handleLogout();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editRoomId) {
      // For creating a new room
      try {
        const response = await axiosInstance.post(
          "http://localhost:5000/api/admin/create-room",
          formData
        );
        console.log("Create Response:", response.data); // Debugging
        alert("Room created successfully!");
        fetchRooms();
        setFormData({
          name: "",
          description: "",
          price: "",
          city: "",
          capacity: "",
        });
        setSelectedImages([]);
      } catch (error) {
        console.error("Error creating room:", error.response?.data || error.message); // Debugging
        alert("Error creating room.");
      }
    } else {
      // For updating an existing room
      try {
        const response = await axiosInstance.put(
          `http://localhost:5000/api/admin/update-room/${editRoomId}`,
          formData // Send as JSON data
        );
        console.log("Update Response:", response.data); // Debugging
        alert("Room updated successfully!");
        fetchRooms();
        setFormData({
          name: "",
          description: "",
          price: "",
          city: "",
          capacity: "",
        });
        setSelectedImages([]);
        setEditRoomId(null);
      } catch (error) {
        console.error("Error updating room:", error.response?.data || error.message); // Debugging
        alert("Error updating room.");
      }
    }
  };

  const handleEdit = (room) => {
    setEditRoomId(room._id);
    setFormData({
      name: room.name,
      description: room.description,
      price: room.price,
      city: room.city,
      capacity: room.capacity,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/admin/delete-room/${id}`);
      alert("Room deleted successfully!");
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Something went wrong.");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/admin-login", loginData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
    setRooms([]);
    alert("Logged out successfully.");
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Room Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Room Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          {editRoomId ? "Update Room" : "Create Room"}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: {room.price}</p>
            <p>City: {room.city}</p>
            <p>Capacity: {room.capacity}</p>
            {room.images && (
              <div className="flex gap-2 mt-2">
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${image}`}
                    alt={`Room ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                ))}
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(room)}
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room._id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
