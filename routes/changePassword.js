const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const validateUser = require("../middleware/validateUser");

// Route for changing the password
router.post("/change-password", validateUser, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Ensure the old and new password are provided
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required!" });
    }

    // Get the current user from the decoded token(contains role and id)
    const userId = req.user.id;

    // Find the user in the database through id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the old password matches the password in the database
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect!" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(15);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error while updating password:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
