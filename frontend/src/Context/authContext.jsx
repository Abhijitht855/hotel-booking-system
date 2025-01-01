import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Add user state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Load token and user info from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Parse user info
      }
    }
  }, []);

  // Clear token and user info on logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser, // Expose setUser for login process
        backendUrl,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
