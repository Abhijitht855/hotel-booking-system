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

  // Fetch token from localStorage
  const token = localStorage.getItem("token");

  // Axios instance with token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch rooms
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
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
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    Array.from(selectedImages).forEach((file) => formDataToSend.append("images", file));

    try {
      if (editRoomId) {
        await axiosInstance.put(
          `http://localhost:5000/api/admin/update-room/${editRoomId}`,
          formDataToSend
        );
        alert("Room updated successfully!");
      } else {
        await axiosInstance.post(
          "http://localhost:5000/api/admin/create-room",
          formDataToSend
        );
        alert("Room created successfully!");
      }
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
      console.error("Error saving room:", error);
      alert("Something went wrong.");
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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Room Manager</h1>
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
