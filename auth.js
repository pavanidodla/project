const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

function isValidPassword(password) {
  const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  return pattern.test(password);
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Weak password format.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });

    await user.save();
    res.status(201).json({ message: 'User registered.' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });

    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in.' });
  }
});

module.exports = router;
