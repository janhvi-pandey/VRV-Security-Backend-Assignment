// scripts/populateRoles.js
const Role = require("../models/roleModel");

async function populateRoles() {
  const roles = [
    { name: "admin", permissions: ["read", "write", "delete"] },
    { name: "moderator", permissions: ["read", "write"] },
    { name: "user", permissions: ["read"] },
  ];

  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role.name });
    if (!existingRole) {
      await Role.create(role);
      console.log(`Role ${role.name} created.`);
    }
  }
}

module.exports = populateRoles;
