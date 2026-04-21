const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['visitor', 'subscriber', 'admin'], default: 'visitor' },
  subscription: {
    plan: { type: String, enum: ['monthly', 'yearly', null], default: null },
    status: { type: String, enum: ['active', 'inactive', 'lapsed'], default: 'inactive' },
    startDate: { type: Date, default: null },
    renewalDate: { type: Date, default: null },
    cancelledAt: { type: Date, default: null }
  },
  charity: {
    charityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity', default: null },
    contributionPercent: { type: Number, min: 10, max: 100, default: 10 }
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
