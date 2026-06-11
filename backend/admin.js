const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
require("dotenv").config();

const admin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@avidus.com" });
    if (adminExists) {
      console.log("Admin account already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "System Admin",
      email: "admin@avidus.com",
      password: hashedPassword,
      role: "Admin",
      status: "Active",
    });

    console.log("🚀 Admin account created successfully!");
    console.log("Email: admin@avidus.com");
    console.log("Password: admin123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

admin();
