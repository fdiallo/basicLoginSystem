const express = require('express');
const router = express.Router();
const User = require("./User.js");
const jwt = require('jsonwebtoken');

// POST route (e.g., /api/users/register)
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

    // Convert to object and remove password before sending back
    const userResponse = newUser.toObject();
    delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// POST route (e.g., /api/users/login)
router.post('/api/users/login', async (req, res) => {
    try {
        // username, email, and password from the req.body
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        const validPassword = await user.isCorrectPassword(password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        // Passwords match, creating token
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

         const userResponse = user.toObject();
    delete userResponse.password;


        res.json({ token, user: userResponse });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login.' });
    }
});


module.exports = router;
