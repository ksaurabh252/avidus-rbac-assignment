const mongoose = require("mongoose");

// Stores user activity logs such as login, task creation, update, and deletion
const activityLogSchema = new mongoose.Schema(
  {
    // Reference to the user who performed the action
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Action performed by the user
    action: {
      type: String,
      required: true,
    },

    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
