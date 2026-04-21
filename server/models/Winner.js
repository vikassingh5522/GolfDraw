const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drawId: { type: mongoose.Schema.Types.ObjectId, ref: 'Draw', required: true },
  matchType: { type: String, enum: ['5-match', '4-match', '3-match'], required: true },
  matchedNumbers: [{ type: Number }],
  prizeAmount: { type: Number, default: 0 },
  verification: {
    proofUrl: { type: String, default: null },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Winner', winnerSchema);
