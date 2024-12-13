import axios from "axios";

// Base axios setup for the API
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure to replace with your backend URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Interceptor to handle token expiration or errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      alert("Your session has expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
