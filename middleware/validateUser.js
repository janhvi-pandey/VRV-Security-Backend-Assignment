const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const secretKey = process.env.SECRET_KEY || "secret-key";

const validateUser = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.header("token");
    console.log(token);

    // Check if the token is present
    if (!token) {
      return res
        .status(401)
        .json({ verified: false, message: "No token provided!" });
    }

    // Verify the token using secretkey
    const decoded = jwt.verify(token, secretKey);

    // Get the user ID and role from the decoded token
    const userId = decoded.id;
    const roleName = decoded.role;

    console.log(userId, roleName);

    // Fetch the user from the database using the ID from the decoded token
    const user = await User.findById(userId).populate("role");

    // If the user doesn't exist, return an error
    if (!user) {
      return res
        .status(404)
        .json({ verified: false, message: "User not found" });
    }

    // If the role doesn't match the role in the token, return an error
    if (user.role.name !== roleName) {
      return res
        .status(403)
        .json({ verified: false, message: "Role mismatch" });
    }

    // Attach the user details to the request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      permissions: user.role.permissions,
    };
    console.log(req.user);

    // Call the next route handler
    next();
  } catch (error) {
    console.log("Error validating user:", error);
    return res
      .status(500)
      .json({ verified: false, message: "Failed to authenticate token" });
  }
};

module.exports = validateUser;
