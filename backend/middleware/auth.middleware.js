const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

// 1. Protected Routes Middleware (Checks if user is logged in)
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header ("Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database and attach to request object
      // `.select("-password")` ensures we don't pass the password hash further
      req.user = await user.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      // Check if user status is Inactive
      if (req.user.status === "Inactive") {
        return res.status(403).json({ message: "Your account is inactive." });
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

// 2. Admin Access Middleware (Checks if logged-in user is an Admin)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next(); // If user is admin, proceed to the route
  } else {
    res.status(403).json({ message: "Access denied. Admin access only." });
  }
};

module.exports = { protect, isAdmin };
