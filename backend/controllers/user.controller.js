const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const activityLog = require("../models/activityLog.model");

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user exists
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, isUserExist.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: isUserExist._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Track login activity
    await activityLog.create({
      user: isUserExist._id,
      action: "LOGIN",
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: isUserExist._id,
        name: isUserExist.name,
        role: isUserExist.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Users (Admin Only)
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users except passwords
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update User Status (Admin Only)
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Update user status by ID
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User (Admin Only)
const deleteUser = async (req, res) => {
  try {
    // Delete user by ID
    const user = await User.findByIdAndDelete(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get Activity Logs (Admin Only)
const getActivityLogs = async (req, res) => {
  try {
    // Fetch activity logs with user and task details
    const logs = await activityLog
      .find()
      .populate("user", "name email")
      .populate("taskId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getActivityLogs,
};
