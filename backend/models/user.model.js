const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: true,
    },

    // Unique email address
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Hashed password
    password: {
      type: String,
      required: true, // Password should be required
    },

    // User role for authorization
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },

    // Account status
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

// Export User model
module.exports = mongoose.model("User", userSchema);
