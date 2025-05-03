const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: String,
  destinationId: String,
  name: String,
  image: String,
  rating: Number
});

module.exports = mongoose.model('Favourite', favoriteSchema);
