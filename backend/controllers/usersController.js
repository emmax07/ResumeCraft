const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

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

const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
