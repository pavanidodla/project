// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  favorites: [String], // stores destination IDs (like 'paris', 'bali', etc.)
});

module.exports = mongoose.model('User', userSchema);
