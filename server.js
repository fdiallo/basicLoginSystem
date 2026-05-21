// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()

const userRouter = require("./userRoutes.js")

const { connectDB } = require("./connection.js")

connectDB()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())     // Middleware to parse JSON bodies

// Routes
app.use("/", userRouter);   // Mount the router

// Port
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Server listening on Port: ${PORT}`) })

