import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const res = await axios.post("http://localhost:5000/api/admin/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role, // Send role during registration
        });
        alert(res.data.message);
      } else {
        const res = await axios.post("http://localhost:5000/api/admin/login", {
          email: form.email,
          password: form.password,
        });
        alert("Login successful");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role); // Store the role in localStorage
        console.log("Token:", res.data.token, "Role:", res.data.role);
        navigate("/"); // Navigate based on role if required
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
            </>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-500 ml-2 underline"
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
