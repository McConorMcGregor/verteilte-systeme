// Import necessary dependencies
const express = require("express"); // Import the Express library
const router = express.Router(); // Create a new router instance
const User = require("../models/user"); // Import the User model

// ## ROUTES FOR USERS ##

// Route for getting all users
router.get("/", async (req, res) => {
  try {
    // Find all appointments in the database
    const users = await User.find();
    // Return the user object as JSON
    res.json(users);
  } catch (error) {
    // If an error occurs, return an error message and status code 500
    res.status(500).json({ message: error.message });
  }
});

// Route for getting a single user by username
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get user" });
  }
});

// Route for creating a new user
router.post("/", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, role, password } = req.body;

    // Create a new user document with the provided data
    const newUser = await User.create({
      username,
      role,
      password,
    });

    // Return the new user document as the response
    res.json(newUser);
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route for updating an existing user
router.patch("/", (req, res) => {
  // TODO: Implement user update logic
});

// Route for deleting a user by ID
router.delete("/:id", (req, res) => {
  // TODO: Implement user deletion logic
});

// ## ROUTES FOR APPOINTMENTS ##

// Route for getting all users
router.get("/", async (req, res) => {
  try {
    // Get the username and password from the request body
    const { title, date, time, insurance } = req.body;
    // Look for a user in the database with the provided credentials
    const appointments = await Appointments.findOne({
      title: title,
      date: date,
      time: time,
      insurance: insurance,
    });
    // If no user is found, return an error message
    if (!appointments) {
      return res.status(401).json({ message: "Invalid data" });
    }
    // If a user is found, return the user object as JSON
    res.json(appointments);
  } catch (error) {
    // If an error occurs, return an error message and status code 500
    res.status(500).json({ message: error.message });
  }
});

// Route for getting a single user by ID
router.get("/:id", (req, res) => {
  // Send the user ID as the response
  res.send(req.params.id);
});

// Route for creating a new user
router.post("/", async (req, res) => {
  // TODO: Implement user creation logic
});

// Route for updating an existing user
router.patch("/", (req, res) => {
  // TODO: Implement user update logic
});

// Route for deleting a user by ID
router.delete("/:id", (req, res) => {
  // TODO: Implement user deletion logic
});

// Export the router module
module.exports = router;
