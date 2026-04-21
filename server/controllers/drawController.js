const Draw = require('../models/Draw');
const Winner = require('../models/Winner');

exports.getDraws = async (req, res) => {
  try {
    const draws = await Draw.find({ status: 'published' }).sort({ year: -1, month: -1 });
    res.json(draws);
  } catch (error) {
    console.error('Draw controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDraw = async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);
    if (!draw) return res.status(404).json({ message: 'Draw not found' });

    const winners = await Winner.find({ drawId: draw._id }).populate('userId', 'name email');
    res.json({ draw, winners });
  } catch (error) {
    console.error('Draw controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUpcomingDraw = async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const existingDraw = await Draw.findOne({ month: currentMonth, year: currentYear });

    res.json({
      month: currentMonth,
      year: currentYear,
      status: existingDraw ? existingDraw.status : 'pending',
      draw: existingDraw || null
    });
  } catch (error) {
    console.error('Draw controller error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
