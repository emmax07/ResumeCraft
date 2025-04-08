const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
require("dotenv").config();

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded; // Attach decoded token data
    next();
  });
};

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Fetch all users from the database
    console.log("Fetched Users:", users);
    res.status(200).json(users); // Return users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// GET User Profile
router.get("/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

module.exports = router;
