const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Function to check if user exists
const checkUserExists = (email, username) => {
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email, username], (err, result) => {
      if (err) {
        console.error("Database query error:", err); // Log the error
        return reject("Error checking for existing user");
      }
      resolve(result);
    });
  });
};

// Function to find a user by email
const findUserByEmail = (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return reject("Error finding user");
      }
      if (result.length === 0) {
        return reject("User not found");
      }
      resolve(result[0]);
    });
  });
};

// Function to create a new user
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
  const role = "user"; // Default role is 'user'

  return new Promise((resolve, reject) => {
    db.query(query, [username, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return reject("Error signing up");
      }
      resolve("User signed up successfully");
    });
  });
};

// Function to get all users
const getAllUsers = () => {
  const query = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return reject("Error fetching users");
      }
      resolve(result);
    });
  });
};

module.exports = { createUser, checkUserExists, findUserByEmail, getAllUsers };
