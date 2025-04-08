const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Prefix routes with "/api" for cleaner URLs
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
