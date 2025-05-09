const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    validate: {
      validator: async function(v) {
        if (!v) return true;
        const group = await mongoose.model('Group').findById(v);
        return group !== null;
      },
      message: 'Referenced group does not exist'
    }
  },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentDate: { type: Date, default: Date.now },
  transactionId: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);