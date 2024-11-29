const mongoose = require("mongoose");

// Define the Role schema
const roleSchema = new mongoose.Schema({
  // 'name' field to define the role name
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin", "moderator", "user"], 
  },

  // 'permissions' field, which is an array of strings
  permissions: {
    type: [String],
    required: true,
    enum: ["read", "write", "delete"], 
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
