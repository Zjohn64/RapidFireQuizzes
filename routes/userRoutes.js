const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/usercontroller');
const { isAuthenticated } = require('../middleware/authMiddleware');
const passport = require('passport');
const User = require('../models/User');

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check for existing user with the same username or email
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (existingUser) {
    // If an existing user is found, send an error response with specific errors
    res.status(409).json({
      errors: {
        username: existingUser.username === username,
        email: existingUser.email === email,
      },
    });
    return;
  }

  registerUser(req, res);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Send the error message in the specified format
      return res.status(400).json({ message: 'Invalid Name or Password. Please Try Again' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
});

router.get('/profile', isAuthenticated, getProfile)

module.exports = router;