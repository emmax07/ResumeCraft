const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Setup MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  secretKey: process.env.JWT_SECRET,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected successfully.");
});

module.exports = db;
