const express = require("express");
const app = express();
const port = 3005; // you can use different port which is available(e.g. 3000,3001)
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

//Middleware Setup

// Use Helmet to set security-related HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());


// Simple route for testing
app.use("/", (req, res) => {
  res.send("Get Ready to explore....");
});


// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
