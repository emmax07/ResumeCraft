const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
require("dotenv").config();

const router = express.Router();

// Middleware to verify JWT token and attach user info
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findUserByEmail(decoded.email);

    if (!user) {
      return res.status(403).json({ message: "Invalid user" });
    }

    req.user = user; // Attach full user info
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// ====================== ADMIN ROUTES ====================== //

// GET all users (admin only)
router.get("/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// CREATE a new user (admin only)
router.post("/users", authenticateToken, isAdmin, async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await userModel.checkUserExists(email, username);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await userModel.createUser(username, email, password, role || "user");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// UPDATE user (admin only)
router.put("/users/:id", authenticateToken, isAdmin, async (req, res) => {
  const userId = req.params.id;
  const { username, email, role } = req.body;

  try {
    await userModel.updateUser(userId, username, email, role);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE user (admin only)
router.delete("/users/:id", authenticateToken, isAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    await userModel.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// =================== AUTHENTICATED USER ROUTES =================== //

// GET User Profile
router.get("/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = req.user;

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

// UPDATE Own Profile (authenticated user)
router.put("/user/profile", authenticateToken, async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.user.id;

  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await userModel.updateUserProfile(userId, username, email, hashedPassword);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
