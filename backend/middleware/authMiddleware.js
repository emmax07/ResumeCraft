const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Middleware to authenticate user using JWT
const authenticate = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provided, access denied." });
  }

  // Remove "Bearer " prefix if it's there
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    const user = await userModel.findUserByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user info to the request object
    next(); // Proceed with next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(500).json({ message: "Failed to authenticate token" });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Insufficient permissions. Admins only" });
  }
  next();
};

// Middleware to check if user is a regular user or an admin
const isUser = (req, res, next) => {
  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Insufficient permissions. Users only" });
  }
  next();
};

module.exports = { authenticate, isAdmin, isUser };
