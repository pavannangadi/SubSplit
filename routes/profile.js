const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Profile Page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('pages/profile', { user: req.user });
});

// Update Profile
router.post('/', ensureAuthenticated, upload.single('profilePic'), async (req, res) => {
  try {
    const { username, email } = req.body;
    const updateData = { username, email };
    
    if (req.file) {
      updateData.profilePic = req.file.filename;
    }
    
    await User.findByIdAndUpdate(req.user._id, updateData);
    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating profile');
    res.redirect('/profile');
  }
});

// Profile picture preview
document.getElementById('profilePic').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('profilePreview').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Delete account confirmation
document.getElementById('deleteAccountBtn').addEventListener('click', function() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    // Add your account deletion logic here
    window.location.href = '/profile/delete';
  }
});

module.exports = router;