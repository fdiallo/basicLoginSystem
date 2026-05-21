const express = require('express');
const router = express.Router();
const User = require("./User.js");

// Create a POST route (e.g., /api/users/register)
router.post("/api/users/register", async (req, res) => {
    try {
        //Take the username, email, and password from the req.body
        const { username, email, password } = req.body;

        // Check if user already exists. If so, return a 400 status
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Create new user, if the user does not exist
        const newUser = new User({ username, email, password });
        
        // Save to DB (triggers the pre-save hook)
        await newUser.save();

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
