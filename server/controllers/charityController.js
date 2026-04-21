const Charity = require('../models/Charity');
const User = require('../models/User');

exports.getCharities = async (req, res) => {
  try {
    const { search, featured } = req.query;
    const filter = {};
    if (search) {
      const sanitized = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: sanitized, $options: 'i' };
    }
    if (featured === 'true') filter.featured = true;

    const charities = await Charity.find(filter).sort({ featured: -1, name: 1 });
    res.json(charities);
  } catch (error) {
    console.error('getCharities error:', error.message);
    res.status(500).json({ message: 'Failed to fetch charities' });
  }
};

exports.getCharity = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);
    if (!charity) return res.status(404).json({ message: 'Charity not found' });
    res.json(charity);
  } catch (error) {
    console.error('getCharity error:', error.message);
    res.status(500).json({ message: 'Failed to fetch charity' });
  }
};

exports.selectCharity = async (req, res) => {
  try {
    const { charityId, contributionPercent } = req.body;

    const charity = await Charity.findById(charityId);
    if (!charity) return res.status(404).json({ message: 'Charity not found' });

    if (contributionPercent < 10 || contributionPercent > 100) {
      return res.status(400).json({ message: 'Contribution must be between 10% and 100%' });
    }

    req.user.charity = { charityId, contributionPercent };
    await req.user.save();

    res.json({ message: 'Charity selected', charity: req.user.charity });
  } catch (error) {
    console.error('selectCharity error:', error.message);
    res.status(500).json({ message: 'Failed to select charity' });
  }
};

exports.donateToCharity = async (req, res) => {
  try {
    const { charityId, amount } = req.body;

    const charity = await Charity.findById(charityId);
    if (!charity) return res.status(404).json({ message: 'Charity not found' });

    charity.totalContributions += amount;
    await charity.save();

    res.json({ message: 'Donation successful', amount });
  } catch (error) {
    console.error('donateToCharity error:', error.message);
    res.status(500).json({ message: 'Failed to process donation' });
  }
};
