const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Created
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected successfully.");
  }
});

// Sign Up Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists by email or username
    const checkUserQuery =
      "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(checkUserQuery, [email, username], async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error checking for existing user" });
      }

      if (result.length > 0) {
        return res
          .status(400)
          .json({ message: "User already exists with this email or username" });
      }

      // If user doesn't exist, proceed with hashing password and inserting the new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(
        insertUserQuery,
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Error signing up" });
          }
          res.status(200).json({ message: "User signed up successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Error hashing password" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      res
        .status(200)
        .json({ message: "User logged in successfully", user: result[0] });
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

// Logout Route
app.post("/logout", (req, res) => {
  // Handle logout (e.g., clear session or token)
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
