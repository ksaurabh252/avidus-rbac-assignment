const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/auth.middleware");
const {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

// --- ADMIN ONLY ROUTES ---
router.get("/all", protect, isAdmin, getAllTasks);

// --- PROTECTED ROUTES (Logged in Users & Admins) ---
router.post("/", protect, createTask);
router.get("/my-tasks", protect, getMyTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
