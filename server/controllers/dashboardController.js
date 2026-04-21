const Score = require('../models/Score');
const Winner = require('../models/Winner');
const Draw = require('../models/Draw');

exports.getSummary = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user._id }).sort({ date: -1 }).limit(5);
    const winnings = await Winner.find({ userId: req.user._id, 'verification.status': 'approved' });
    const totalWon = winnings.reduce((sum, w) => sum + w.prizeAmount, 0);

    const now = new Date();
    const upcomingDraw = await Draw.findOne({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      status: 'simulated'
    });

    res.json({
      subscription: req.user.subscription,
      charity: req.user.charity,
      scores,
      totalWon,
      pendingPayouts: winnings.filter((w) => w.paymentStatus === 'pending').length,
      upcomingDraw: upcomingDraw ? { month: upcomingDraw.month, year: upcomingDraw.year } : null,
      hasEnoughScores: scores.length >= 5
    });
  } catch (error) {
    console.error('Dashboard controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWinnings = async (req, res) => {
  try {
    const winnings = await Winner.find({ userId: req.user._id })
      .populate('drawId', 'month year winningNumbers')
      .sort({ createdAt: -1 });
    res.json(winnings);
  } catch (error) {
    console.error('Dashboard controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getParticipation = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user._id });
    const draws = await Draw.find({ status: 'published' }).sort({ year: -1, month: -1 });

    res.json({
      scoreCount: scores.length,
      eligible: scores.length >= 5,
      drawsEntered: draws.length,
      draws
    });
  } catch (error) {
    console.error('Dashboard controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
