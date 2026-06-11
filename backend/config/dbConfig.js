require("dotenv").config();

const mongoose = require("mongoose");

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.error("Database connection error:", error.message);

    // Exit application if database connection fails
    process.exit(1);
  }
};

module.exports = dbConnect;
