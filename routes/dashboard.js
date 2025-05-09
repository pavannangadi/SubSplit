const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Group = require('../models/Group');
const Payment = require('../models/Payment');

// Dashboard Route
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get active groups where user is a member
    const activeGroups = await Group.find({ members: req.user._id })
      .populate('members', 'username profilePic')
      .populate('createdBy', 'username')
      .lean();

    // 2. Get upcoming payments (next 30 days)
    const upcomingPayments = await Payment.find({
      user: req.user._id,
      status: 'pending',
      paymentDate: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    }).populate('group', 'name service').lean();

    // 3. Calculate total savings
    const completedPayments = await Payment.find({
      user: req.user._id,
      status: 'completed'
    }).lean();

    const totalSaved = completedPayments.reduce((sum, payment) => sum + payment.amountSaved, 0);

    // 4. Get recent payments (last 5)
    // Modify your recentPayments query to ensure proper population
    const recentPayments = await Payment.find({ user: req.user._id })
      .sort({ paymentDate: -1 })
      .limit(5)
      .populate({
        path: 'group',
        select: 'name service',
        // Add this to handle missing groups:
        options: { allowNull: true }
      })
      .lean();

    // Clean up any payments referencing deleted groups
    await Payment.updateMany(
      { group: { $in: await Group.find({ deletedAt: { $ne: null } }).distinct('_id') } },
      { $set: { group: null } }
    );

    // Render dashboard with all data
    res.render('pages/dashboard', {
      user: req.user,
      activeGroups,
      upcomingPayments,
      totalSaved: totalSaved.toFixed(2),
      recentPayments
    });

  } catch (err) {
    console.error('Dashboard error:', err);
    req.flash('error_msg', 'Error loading dashboard');
    res.redirect('/home');
  }
});

module.exports = router;