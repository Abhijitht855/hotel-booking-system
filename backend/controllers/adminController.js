import multer from 'multer';
import Room from "../models/roomModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";






// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const user = new User({ name, email, password,role });
    await user.save();
    res.status(201).json({ message: "admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Admin login function

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ token, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

// Filter for allowed image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only image files are allowed'), false); // Reject non-image files
  }
};

// Multer configuration for image uploads
const upload = multer({ storage, fileFilter });

// Middleware to handle image uploads
export const uploadRoomImages = upload.array('images', 5); // Allows up to 5 images

// Create Room with image upload
export const createRoom = async (req, res) => {
  try {
    // Ensure that images are uploaded before proceeding
    if (!req.files) return res.status(400).json({ message: 'No images uploaded' });

    // Map the file paths of uploaded images
    const imagePaths = req.files.map(file => `http://localhost:5000/${file.path.replace(/\\/g, '/')}`);

    // Check if required fields are in the body
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.city || !req.body.capacity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create room with image URLs
    const room = new Room({
      ...req.body,
      images: `${imagePaths}` // Store the array of image paths
    });

    await room.save();
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Room with image upload
export const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    
    if (req.files) {
      const imagePaths = req.files.map(file => file.path); // Update images
      req.body.images = imagePaths;
    }

    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({ message: "Room updated successfully", updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Room
export const deleteRoom = async (req, res) => {
  try { 
    const roomId = req.params.id;
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

