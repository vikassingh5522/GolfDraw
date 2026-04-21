const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true },
  winningNumbers: [{ type: Number, min: 1, max: 45 }],
  drawType: { type: String, enum: ['random', 'algorithmic'], required: true },
  status: { type: String, enum: ['simulated', 'published'], default: 'simulated' },
  prizePool: {
    total: { type: Number, default: 0 },
    fiveMatch: { type: Number, default: 0 },
    fourMatch: { type: Number, default: 0 },
    threeMatch: { type: Number, default: 0 }
  },
  jackpotRollover: { type: Number, default: 0 },
  publishedAt: { type: Date, default: null }
}, { timestamps: true });

drawSchema.index({ month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Draw', drawSchema);
