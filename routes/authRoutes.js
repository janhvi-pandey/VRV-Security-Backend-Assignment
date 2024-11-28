// Contains routes for authentication like Register, Login.
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "secretkey";

// Route for register by users
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation checks: Ensure all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All Fields are required!" });
    }

    // Check if the role exists in the database
    const foundRole = await Role.findOne({ name: role });
    if (!foundRole) {
      return res.status(400).json({ message: "Invalid role (Valid Roles are: admin, user, moderator" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        user: existingUser,
      });
    }

    // Hashing the password for security
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the role as a reference
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: foundRole._id, // Save the role's ObjectId in the user model
    });

    // Create a token for the user for authentication
    const token = jwt.sign(
      { id: newUser._id, role: foundRole.name },
      secretKey
    );

    res.json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
