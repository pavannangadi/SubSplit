const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Payment = require('../models/Payment');
const Group = require('../models/Group');

// Payments Page
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const upcomingPayments = await Group.find({ 
      members: req.user._id,
      nextPaymentDate: { $gte: new Date() }
    }).sort({ nextPaymentDate: 1 });
    
    const paymentHistory = await Payment.find({ user: req.user._id })
      .sort({ paymentDate: -1 })
      .populate('group');
      
    res.render('pages/payments', {
      user: req.user,
      upcomingPayments,
      paymentHistory
    });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
});

module.exports = router;