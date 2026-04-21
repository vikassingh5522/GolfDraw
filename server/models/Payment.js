const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['subscription', 'donation'], required: true },
  status: { type: String, enum: ['completed', 'failed'], default: 'completed' },
  plan: { type: String, enum: ['monthly', 'yearly', null], default: null },
  charityContribution: { type: Number, default: 0 },
  prizePoolContribution: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
