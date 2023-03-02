// Load required modules
require("dotenv").config(); // Load environment variables from .env file
const axios = require("axios"); // Use the Axios package to make HTTP requests
const express = require("express"); // Use Express to create the server
const cors = require("cors"); // Use the CORS package to enable Cross-Origin Resource Sharing

// Create an instance of the Express application
const app = express();

// Import the Mongoose library for MongoDB database connectivity
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Set the strictQuery option to false to allow for looser queries

// Connect to the MongoDB database using the DATABASE_URL environment variable
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error)); // Log any connection errors
db.once("open", () => console.log("Connected to Database")); // Log a message when the connection is established

// Use the Express.json() middleware to parse incoming request data as JSON
app.use(express.json());

app.use(cors());


// Set up the user and appointment routes using their respective routers
const userRouter = require("./routes/users");
app.use("/users", userRouter);

const appointmentRouter = require("./routes/appointments");
app.use("/appointments", appointmentRouter);

// Set up the server to listen on port 3000
app.listen(3000, () => console.log("Connected to Server"));
