import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for forms
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    isLogin
      ? setLoginData({ ...loginData, [name]: value })
      : setRegisterData({ ...registerData, [name]: value });
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", loginData);
      login(res.data); // Save token and user data in context
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", registerData);
      login(res.data); // Save token and user data in context
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">{isLogin ? "Login" :
       "Register"}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="space-y-4"
      >
        {!isLogin && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={isLogin ? loginData.email : registerData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={isLogin ? loginData.password : registerData.password}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="text-blue-500 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Login;
