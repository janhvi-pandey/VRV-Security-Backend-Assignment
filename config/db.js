const mongoose = require("mongoose");

// Load environment variables from .env file
const dotenv = require("dotenv");

// Load environment variables from .env file into process.env
dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connection Successful 😊");
  } catch (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;
