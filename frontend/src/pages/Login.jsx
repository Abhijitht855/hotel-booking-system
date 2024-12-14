import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/authContext";

const Login = () => {
  const { login, register } = useContext(AuthContext); // Access login/register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Optional for registration
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await register({ name, email, password });
        alert("Registration successful!");
      } else {
        await login({ email, password });
        alert("Login successful!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "New user? Register"}
        </p>
      </form>
    </div>
  );
};

export default Login;
