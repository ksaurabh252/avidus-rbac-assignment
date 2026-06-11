const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/auth.middleware");
const {
  registerUser,
  userLogin,
  getAllUsers,
  updateUserStatus,
  deleteUser,
} = require("../controllers/user.controller");

// --- PUBLIC ROUTES ---
router.post("/register", registerUser);
router.post("/login", userLogin);

// --- ADMIN ONLY ROUTES ---

router.get("/", protect, isAdmin, getAllUsers);
router.put("/:id/status", protect, isAdmin, updateUserStatus);
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
