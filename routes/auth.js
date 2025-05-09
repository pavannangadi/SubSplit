const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('pages/auth/login', { 
    layout: false,
    error: req.flash('error')[0] // Pass flash error to template
  });
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid email or password'
  })(req, res, next);
});

// Register Page
router.get('/signup', forwardAuthenticated, (req, res) => {
  res.render('pages/auth/signup', { 
    errors: [],
    username: '',
    email: '',
    password: '',
    password2: '',
    layout: false 
  });
});

// Register Handle
router.post('/signup', async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  // Basic validation
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  // Return validation errors if any
  if (errors.length > 0) {
    return res.render('pages/auth/signup', {
      errors,
      username,
      email,
      password,
      password2,
      layout: false
    });
  }

  try {
    // Check for existing username or email
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      if (existingUser.username === username) {
        errors.push({ msg: 'Username already exists' });
      }
      if (existingUser.email === email) {
        errors.push({ msg: 'Email already registered' });
      }
      return res.render('pages/auth/signup', {
        errors,
        username,
        email,
        password,
        password2,
        layout: false
      });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Registration success
    req.flash('success_msg', 'Registration successful! You can now login');
    res.redirect('/auth/login');

  } catch (err) {
    console.error('Registration error:', err);
    
    // Handle duplicate key error (in case race condition occurs)
    if (err.code === 11000) {
      errors.push({ msg: 'Username or email already exists' });
      return res.render('pages/auth/signup', {
        errors,
        username,
        email,
        password,
        password2,
        layout: false
      });
    }

    // Other server errors
    req.flash('error_msg', 'Registration failed. Please try again');
    res.redirect('/auth/signup');
  }
});

// Logout Handle
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'You have been logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;
