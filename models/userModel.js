const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId, // Field to reference the 'Role' collection
    ref: "Role", // This indicates that the 'role' field references the 'Role' model
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
