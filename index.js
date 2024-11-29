//Main Server File
//Initializes the Express app, connects to the database, and sets up middleware, routes, and role initialization.

const express = require("express");
const app = express();
const port = process.env.PORT || 3005; // u can initialise port in .env file. If not set, it defaults to 3005.
const cors = require("cors");
const helmet = require("helmet");
const populateRoles = require("./scripts/populateRoles"); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB(); //connect to database

//Middleware Setup

// Use Helmet to set security-related HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());


// Initialize roles in the database only if needed
(async () => {
  try {
    await populateRoles();
    console.log("Role initialization checked.");
  } catch (err) {
    console.error("Error during role initialization:", err);
  }
})();

//Authentication Route(like register,login)
app.use("/auth", require("./routes/authRoutes"));

//Routes to access details based on roles
app.use("/getdetails", require("./routes/fetchDetails"));

// Simple route for testing
app.use("/", (req, res) => {
  res.send("Get Ready to explore....");
});


// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
