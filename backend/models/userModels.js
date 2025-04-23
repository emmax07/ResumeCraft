const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Create a new user
const createUser = (username, email, password, role = "user") => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [username, email, hashedPassword, role],
        (err, result) => {
          if (err) return reject("Error creating user");
          resolve(result);
        }
      );
    } catch (error) {
      reject("Error hashing password");
    }
  });
};

// Check if user already exists by email or username
const checkUserExists = (email, username) => {
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email, username], (err, results) => {
      if (err) return reject("Error checking user existence");
      resolve(results);
    });
  });
};

// Find user by email (for login or JWT)
const findUserByEmail = (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, results) => {
      if (err) return reject("Error finding user by email");
      resolve(results[0]); // Return single user
    });
  });
};

// Get all users (admin only)
const getAllUsers = () => {
  const query = "SELECT id, username, email, role FROM users";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject("Error retrieving users");
      resolve(results);
    });
  });
};

// Update user (admin only)
const updateUser = (id, username, email, role) => {
  const query =
    "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [username, email, role, id], (err, result) => {
      if (err) return reject("Error updating user");
      resolve(result);
    });
  });
};

// Delete user (admin only)
const deleteUser = (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) return reject("Error deleting user");
      resolve(result);
    });
  });
};

// Update authenticated user's own profile
const updateUserProfile = async (id, username, email, password) => {
  let query, values;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query =
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
    values = [username, email, hashedPassword, id];
  } else {
    query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    values = [username, email, id];
  }

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) return reject("Error updating profile");
      resolve(result);
    });
  });
};

module.exports = {
  createUser,
  checkUserExists,
  findUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserProfile,
};
