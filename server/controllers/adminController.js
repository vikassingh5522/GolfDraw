const User = require('../models/User');
const Score = require('../models/Score');
const Draw = require('../models/Draw');
const Winner = require('../models/Winner');
const Charity = require('../models/Charity');
const Payment = require('../models/Payment');
const { generateRandomNumbers, generateAlgorithmicNumbers, findMatches, getMatchType } = require('../services/drawEngine');
const { calculatePrizePool, splitPrize } = require('../services/prizeCalculator');

// User Management
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Admin getUsers error:', error.message);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const allowedFields = ['name', 'role', 'subscription', 'charity'];
    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Admin updateUser error:', error.message);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

exports.updateUserScores = async (req, res) => {
  try {
    const { scores } = req.body;
    for (const s of scores) {
      await Score.findByIdAndUpdate(s._id, { score: s.score, date: s.date });
    }
    res.json({ message: 'Scores updated' });
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Draw Management
exports.configureDraw = async (req, res) => {
  try {
    const { month, year, drawType } = req.body;

    const existing = await Draw.findOne({ month, year });
    if (existing && existing.status === 'published') {
      return res.status(400).json({ message: 'Draw already published for this month' });
    }

    const winningNumbers = drawType === 'algorithmic'
      ? await generateAlgorithmicNumbers()
      : generateRandomNumbers();

    const lastDraw = await Draw.findOne({ status: 'published' }).sort({ year: -1, month: -1 });
    let jackpotRollover = 0;
    if (lastDraw) {
      const fiveMatchWinners = await Winner.countDocuments({ drawId: lastDraw._id, matchType: '5-match' });
      if (fiveMatchWinners === 0) {
        jackpotRollover = lastDraw.prizePool.fiveMatch + (lastDraw.jackpotRollover || 0);
      }
    }

    const prizePool = await calculatePrizePool(jackpotRollover);

    const draw = existing
      ? await Draw.findByIdAndUpdate(existing._id, { winningNumbers, drawType, prizePool, jackpotRollover, status: 'simulated' }, { new: true })
      : await Draw.create({ month, year, winningNumbers, drawType, prizePool, jackpotRollover });

    res.json(draw);
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.simulateDraw = async (req, res) => {
  try {
    const { drawId } = req.body;
    const draw = await Draw.findById(drawId);
    if (!draw) return res.status(404).json({ message: 'Draw not found' });

    const subscribers = await User.find({ 'subscription.status': 'active' });
    const results = { '5-match': [], '4-match': [], '3-match': [], noMatch: [] };

    for (const user of subscribers) {
      const scores = await Score.find({ userId: user._id }).sort({ date: -1 }).limit(5);
      if (scores.length < 5) continue;

      const userNumbers = scores.map((s) => s.score);
      const matched = findMatches(userNumbers, draw.winningNumbers);
      const matchType = getMatchType(matched.length);

      if (matchType) {
        results[matchType].push({ userId: user._id, name: user.name, email: user.email, matched });
      } else {
        results.noMatch.push({ userId: user._id, name: user.name });
      }
    }

    res.json({
      draw,
      simulation: results,
      summary: {
        fiveMatch: results['5-match'].length,
        fourMatch: results['4-match'].length,
        threeMatch: results['3-match'].length,
        noMatch: results.noMatch.length
      }
    });
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.publishDraw = async (req, res) => {
  try {
    const { drawId } = req.body;
    const draw = await Draw.findById(drawId);
    if (!draw) return res.status(404).json({ message: 'Draw not found' });
    if (draw.status === 'published') return res.status(400).json({ message: 'Already published' });

    const subscribers = await User.find({ 'subscription.status': 'active' });
    const winnersByTier = { '5-match': [], '4-match': [], '3-match': [] };

    for (const user of subscribers) {
      const scores = await Score.find({ userId: user._id }).sort({ date: -1 }).limit(5);
      if (scores.length < 5) continue;

      const userNumbers = scores.map((s) => s.score);
      const matched = findMatches(userNumbers, draw.winningNumbers);
      const matchType = getMatchType(matched.length);

      if (matchType) {
        winnersByTier[matchType].push({ userId: user._id, matched });
      }
    }

    for (const tier of ['5-match', '4-match', '3-match']) {
      const tierKey = tier === '5-match' ? 'fiveMatch' : tier === '4-match' ? 'fourMatch' : 'threeMatch';
      const poolAmount = draw.prizePool[tierKey] + (tier === '5-match' ? draw.jackpotRollover : 0);
      const prizePerWinner = splitPrize(poolAmount, winnersByTier[tier].length);

      for (const winner of winnersByTier[tier]) {
        await Winner.create({
          userId: winner.userId,
          drawId: draw._id,
          matchType: tier,
          matchedNumbers: winner.matched,
          prizeAmount: prizePerWinner
        });
      }
    }

    draw.status = 'published';
    draw.publishedAt = new Date();
    await draw.save();

    res.json({ message: 'Draw published', draw });
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Charity CRUD (admin)
exports.createCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body);
    res.status(201).json(charity);
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!charity) return res.status(404).json({ message: 'Charity not found' });
    res.json(charity);
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndDelete(req.params.id);
    if (!charity) return res.status(404).json({ message: 'Charity not found' });
    res.json({ message: 'Charity deleted' });
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Winner Management
exports.getWinners = async (req, res) => {
  try {
    const winners = await Winner.find()
      .populate('userId', 'name email')
      .populate('drawId', 'month year')
      .sort({ createdAt: -1 });
    res.json(winners);
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyWinner = async (req, res) => {
  try {
    const { status } = req.body;
    const winner = await Winner.findByIdAndUpdate(
      req.params.id,
      { 'verification.status': status },
      { new: true }
    );
    if (!winner) return res.status(404).json({ message: 'Winner not found' });
    res.json(winner);
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markPayout = async (req, res) => {
  try {
    const winner = await Winner.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: 'paid' },
      { new: true }
    );
    if (!winner) return res.status(404).json({ message: 'Winner not found' });
    res.json(winner);
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reports
exports.getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscribers = await User.countDocuments({ 'subscription.status': 'active' });
    const totalCharityContributions = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: '$charityContribution' } } }
    ]);
    const totalPrizePool = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: '$prizePoolContribution' } } }
    ]);
    const totalDraws = await Draw.countDocuments({ status: 'published' });
    const totalWinners = await Winner.countDocuments();

    res.json({
      totalUsers,
      activeSubscribers,
      totalCharityContributions: totalCharityContributions[0]?.total || 0,
      totalPrizePool: totalPrizePool[0]?.total || 0,
      totalDraws,
      totalWinners
    });
  } catch (error) {
    console.error('Admin controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
