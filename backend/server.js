const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConfig");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = process.env.PORT || 3000;

//Database connection
dbConnect();

app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
