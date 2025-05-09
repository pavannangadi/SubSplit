const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { ensureAuthenticated } = require('../config/auth');
const Group = require('../models/Group');
const User = require('../models/User');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create new group
router.post('/create', ensureAuthenticated, upload.single('groupImage'), async (req, res) => {
  try {
    const { serviceName, totalSlots, totalPrice, billingCycle } = req.body;
    const pricePerUser = (totalPrice / totalSlots).toFixed(2);
    
    const group = new Group({
      name: serviceName,
      service: serviceName,
      image: req.file.filename,
      totalSlots: parseInt(totalSlots),
      pricePerUser: parseFloat(pricePerUser),
      billingCycle,
      createdBy: req.user._id,
      members: [req.user._id],
      filledSlots: 1,
      nextPaymentDate: billingCycle === 'monthly' ? 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : 
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });
    
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join existing group
router.post('/join/:groupId', ensureAuthenticated, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    if (group.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are already a member of this group' });
    }
    
    if (group.filledSlots >= group.totalSlots) {
      return res.status(400).json({ message: 'This group is already full' });
    }
    
    group.members.push(req.user._id);
    group.filledSlots += 1;
    await group.save();
    
    res.status(200).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;