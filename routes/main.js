const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Group = require('../models/Group');

// Landing Page
router.get('/', forwardAuthenticated, (req, res) => {
  res.render('pages/landing', { layout: false });
});

// Home Page
router.get('/home', ensureAuthenticated, async (req, res) => {
  try {
    const activeGroups = await Group.find({ members: req.user._id });
    const recommendedGroups = await Group.aggregate([
      { 
        $match: { 
          members: { $ne: req.user._id },
          $expr: { $lt: ["$filledSlots", "$totalSlots"] } 
        } 
      },
      { $limit: 5 }
    ]);
    
    res.render('pages/home', {
      user: req.user,
      activeGroups,
      recommendedGroups
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const activeGroups = await Group.find({ members: req.user._id });

    // Dummy data: Replace with real data from your database (e.g., Payment model)
    const upcomingPayments = [
      { name: 'Netflix', dueDate: '2025-04-15', amount: 100 },
      { name: 'Spotify', dueDate: '2025-04-20', amount: 50 }
    ];

    const recentPayments = [
      { name: 'YouTube Premium', date: '2025-04-01', amount: 75 },
      { name: 'Amazon Prime', date: '2025-03-25', amount: 60 }
    ];

    const totalSaved = activeGroups.reduce((sum, group) => {
      return sum + (group.savedAmount || 0); // Use actual field if different
    }, 0);

    res.render('pages/dashboard', {
      user: req.user,
      activeGroups,
      upcomingPayments,
      recentPayments, // 👈 ADD THIS
      totalSaved
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;