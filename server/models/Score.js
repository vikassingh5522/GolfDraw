const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 1, max: 45 },
  date: { type: Date, required: true },
  courseName: { type: String, trim: true, default: '' },
  handicap: { type: Number, default: null },
  weather: { type: String, enum: ['sunny', 'cloudy', 'rainy', 'windy', ''], default: '' },
  roundType: { type: String, enum: ['18-hole', '9-hole', ''], default: '' },
  notes: { type: String, trim: true, default: '' }
}, { timestamps: true });

scoreSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Score', scoreSchema);
