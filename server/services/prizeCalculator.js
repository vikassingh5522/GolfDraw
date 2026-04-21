const User = require('../models/User');

const PLAN_PRICES = { monthly: 9.99, yearly: 99.99 / 12 };
const POOL_PERCENT = 0.6;
const TIER_SPLIT = { '5-match': 0.40, '4-match': 0.35, '3-match': 0.25 };

async function calculatePrizePool(jackpotRollover = 0) {
  const subscribers = await User.countDocuments({ 'subscription.status': 'active' });
  const avgFee = PLAN_PRICES.monthly;
  const avgCharity = 0.10;
  const netPerUser = avgFee * (1 - avgCharity) * POOL_PERCENT;
  const total = subscribers * netPerUser + jackpotRollover;

  return {
    total: Math.round(total * 100) / 100,
    fiveMatch: Math.round(total * TIER_SPLIT['5-match'] * 100) / 100,
    fourMatch: Math.round(total * TIER_SPLIT['4-match'] * 100) / 100,
    threeMatch: Math.round(total * TIER_SPLIT['3-match'] * 100) / 100
  };
}

function splitPrize(poolAmount, winnerCount) {
  if (winnerCount === 0) return 0;
  return Math.round((poolAmount / winnerCount) * 100) / 100;
}

module.exports = { calculatePrizePool, splitPrize, TIER_SPLIT };
