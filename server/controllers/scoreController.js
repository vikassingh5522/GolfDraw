const Score = require('../models/Score');

exports.getScores = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(5);
    res.json(scores);
  } catch (error) {
    console.error('getScores error:', error.message);
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
};

exports.addScore = async (req, res) => {
  try {
    const { score, date, courseName, handicap, weather, roundType, notes } = req.body;

    const existing = await Score.findOne({ userId: req.user._id, date: new Date(date) });
    if (existing) {
      return res.status(400).json({ message: 'A score already exists for this date. Edit or delete it instead.' });
    }

    const count = await Score.countDocuments({ userId: req.user._id });

    if (count >= 5) {
      const oldest = await Score.findOne({ userId: req.user._id }).sort({ date: 1 });
      await Score.findByIdAndDelete(oldest._id);
    }

    const newScore = await Score.create({
      userId: req.user._id,
      score, date, courseName, handicap, weather, roundType, notes
    });

    res.status(201).json(newScore);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A score already exists for this date.' });
    }
    console.error('addScore error:', error.message);
    res.status(500).json({ message: 'Failed to add score' });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const scoreDoc = await Score.findOne({ _id: req.params.id, userId: req.user._id });
    if (!scoreDoc) {
      return res.status(404).json({ message: 'Score not found' });
    }

    const { score, date, courseName, handicap, weather, roundType, notes } = req.body;

    if (date) {
      const duplicate = await Score.findOne({
        userId: req.user._id,
        date: new Date(date),
        _id: { $ne: req.params.id }
      });
      if (duplicate) {
        return res.status(400).json({ message: 'A score already exists for this date.' });
      }
    }

    Object.assign(scoreDoc, { score, date, courseName, handicap, weather, roundType, notes });
    await scoreDoc.save();

    res.json(scoreDoc);
  } catch (error) {
    console.error('updateScore error:', error.message);
    res.status(500).json({ message: 'Failed to update score' });
  }
};

exports.deleteScore = async (req, res) => {
  try {
    const scoreDoc = await Score.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!scoreDoc) {
      return res.status(404).json({ message: 'Score not found' });
    }
    res.json({ message: 'Score deleted' });
  } catch (error) {
    console.error('deleteScore error:', error.message);
    res.status(500).json({ message: 'Failed to delete score' });
  }
};
