const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "secret-key";

const validateUser = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.header("token");

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ verified: false, message: "No token provided!" });
    }

    // Verify the token using secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach user data to req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    // Proceed to the next route handler
    next();
  } catch (error) {

    // Return an error response if token verification fails
    console.log("Error validating user:", error);
    return res.status(500).json({ verified: false, message: "Failed to authenticate token" });
  }
};

module.exports = validateUser;
