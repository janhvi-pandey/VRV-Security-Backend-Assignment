const Role = require("../models/roleModel");

async function populateRoles() {
  try {
    // Check if there are any roles in the database
    const existingRoles = await Role.find();
    if (existingRoles.length > 0) {
      console.log("Roles already initialized. Skipping population.");
      return;
    }

    // If no roles exist, populate the default roles
    const roles = [
      { name: "admin", permissions: ["read", "write", "delete"] },
      { name: "moderator", permissions: ["read", "write"] },
      { name: "user", permissions: ["read"] },
    ];

    await Role.insertMany(roles);
    console.log("Roles initialized successfully.");
  } catch (error) {
    console.error("Error populating roles:", error);
  }
}

module.exports = populateRoles;
