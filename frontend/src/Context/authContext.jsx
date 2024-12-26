import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Access backend URL from environment variables

  // Load token from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Clear token on logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        backendUrl,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
