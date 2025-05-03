const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favourite');

// GET favorites for a user
router.get('/:userId', async (req, res) => {
  const favorites = await Favorite.find({ userId: req.params.userId });
  res.json(favorites);
});

// ADD a favorite
router.post('/', async (req, res) => {
  try {
    const { userId, destinationId, name, image, rating } = req.body;

    const favorite = new Favorite({
      userId,
      destinationId,
      name,
      image,
      rating
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});


// DELETE a favorite
router.delete('/:userId/:destinationId', async (req, res) => {
  try {
    const { userId, destinationId } = req.params;

    await Favorite.deleteOne({ userId, destinationId });
    res.json({ message: "Favorite deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting favorite" });
  }
});


module.exports = router;
