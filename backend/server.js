const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads folder for file uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Prefix routes with "/api"
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", resumeRoutes);

// Error handling for other routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
