const mongoose = require("mongoose");

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    // Task title
    title: String,

    // Task description
    description: String,

    // Reference to the user who created the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Task completion status
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Export Task model
const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
