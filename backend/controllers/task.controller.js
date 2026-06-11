const Task = require("../models/task.model");
const ActivityLog = require("../models/activityLog.model");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate task title
    if (!title?.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    // Create new task
    const task = await Task.create({
      title,
      description,
      createdBy: req.user._id,
    });

    // Log task creation activity
    await ActivityLog.create({
      user: req.user._id,
      action: "TASK_CREATED",
      taskId: task._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Tasks (For Regular Users)
const getMyTasks = async (req, res) => {
  try {
    // Fetch tasks created by logged-in user
    const tasks = await Task.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get ALL Tasks (For Admins Only)
const getAllTasks = async (req, res) => {
  try {
    // Include creator details with each task
    const tasks = await Task.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update Own Task
const updateTask = async (req, res) => {
  try {
    // Find task owned by logged-in user
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const { title, description, completed } = req.body;

    // Update only provided fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    // Log task update activity
    await ActivityLog.create({
      user: req.user._id,
      action: "TASK_UPDATED",
      taskId: task._id,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task (Admins delete ANY, Users delete OWN)
const deleteTask = async (req, res) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Allow only admin or task owner to delete
    if (
      req.user.role !== "Admin" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this task",
      });
    }

    await task.deleteOne();

    // Log task deletion activity
    await ActivityLog.create({
      user: req.user._id,
      action: "TASK_DELETED",
      taskId: task._id,
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  deleteTask,
};
