const express = require("express");
const router = express.Router();
const validateUser = require("../Middleware/validateUser");
const User = require("../models/userModel");

/**
 * Route for getting user details based on their role.
 * Accessible roles: "admin", "moderator", "user".
 */

router.get("/:role-details", validateUser, async (req, res) => {
  try {
    // Extract role from the URL
    const requestedRole = req.params.role;

    // Extract role from validated token
    const userRole = req.user.role;

    // Check if the user is authorized to access the requested role's details
    if (requestedRole !== userRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied! You are not authorized as ${requestedRole}.`,
      });
    }

    // Fetch user details from the database
    const user = await User.findById(req.user.id)
      .select("-password") // Exclude the password from the response
      .populate("role", "name permissions"); // Populate the 'role' field to get role details

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If user is found, return the user data along with their role details
    res.status(200).json({
      success: true,
      message: `Details for ${requestedRole}`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        permissions: user.role.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
