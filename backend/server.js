require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");

const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Database connection
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});