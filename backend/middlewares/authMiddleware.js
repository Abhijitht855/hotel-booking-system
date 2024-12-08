import jwt from "jsonwebtoken";

// Auth middleware to verify JWT token
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to authorize admin access
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
