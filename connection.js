// Dependencies
const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGO_URI

// Define connection to the database
const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Successfully connected to MongoDB!")
    } catch (error) {
        console.error("Connection error", err)
    }
}

module.exports = { connectDB }



