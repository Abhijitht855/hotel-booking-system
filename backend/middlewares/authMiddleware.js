import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure that decoded contains the user data (like user._id)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};


export const authorizeAdmin = (req, res, next) => {
  if (req.user?.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
