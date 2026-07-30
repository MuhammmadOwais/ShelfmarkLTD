const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

// Helper function to hash password
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
    });

    const createdUser = await user.save();

    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
      isAdmin: createdUser.isAdmin,
      shippingAddress: createdUser.shippingAddress
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify hashed password
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Request password reset (Forgot Password)
// @route   POST /api/users/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate a 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set code and expiration (10 minutes)
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    
    await user.save();

    // Since we don't have SMTP configured, we return the code directly for the developer/user to proceed easily
    res.json({
      message: 'Password reset code generated successfully.',
      resetCode: resetCode, // Sending it back so the client UI can auto-populate or display it for verification
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Reset password using reset code
// @route   POST /api/users/reset-password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ 
      email: email.toLowerCase(),
      resetPasswordCode: code,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset code' });
    }

    // Hash and update new password
    user.password = hashPassword(newPassword);
    
    // Clear reset tokens
    user.resetPasswordCode = null;
    user.resetPasswordExpire = null;

    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all users (excluding passwords)
// @route   GET /api/users
// @access  Public (simplified for administrative operations)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
