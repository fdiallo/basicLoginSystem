const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance method to check password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);













//==========================



// import { Schema, model } from "mongoose";
// import bcrypt from "bcrypt";

// const userSchema = new Schema({
//     username: { type: String, required: true, unique: true, trim: true,},
//     email: { type: String, required: true, unique: true, },
//     password: { type: String, required: true, minlength: 8, },
// });
 
// // Set up pre-save middleware to create password
// userSchema.pre("save", async function (next) {
//   if (this.isNew || this.isModified("password")) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }
 
//   next();
// });
 
// const User = model("User", userSchema);
 
// export default User;

