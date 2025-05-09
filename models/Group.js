const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  image: { type: String, required: true },
  totalSlots: { type: Number, required: true },
  filledSlots: { type: Number, default: 0 },
  pricePerUser: { type: Number, required: true },
  billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  nextPaymentDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
}, { timestamps: true }
);
// });

module.exports = mongoose.model('Group', groupSchema);