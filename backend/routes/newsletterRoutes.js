const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const exists = await Newsletter.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    const subscription = new Newsletter({ email: email.toLowerCase() });
    await subscription.save();

    res.status(201).json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
