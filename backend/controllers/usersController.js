const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

// Signup function
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.checkUserExists(email, username);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await userModel.createUser(username, email, password);
    res.status(200).json({ message: "User signed up successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during signup. Please try again." });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT Token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during login. Please try again." });
  }
};

// Logout function
const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

// Fetch user profile
const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching user profile" });
  }
};

// Update user profile (username, email, password)
const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare user data for update
    const updateData = { username, email };

    if (password) {
      // Hash the password if provided
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update user
    await userModel.updateUserProfile(userId, updateData);
    const updatedUser = await userModel.findUserById(userId);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the profile" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
};
