const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  events: [{
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String }
  }],
  featured: { type: Boolean, default: false },
  totalContributions: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Charity', charitySchema);
