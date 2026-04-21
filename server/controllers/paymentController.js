const User = require('../models/User');
const Payment = require('../models/Payment');

const PLAN_PRICES = { monthly: 9.99, yearly: 99.99 };

exports.subscribe = async (req, res) => {
  try {
    const { plan } = req.body;
    if (!PLAN_PRICES[plan]) {
      return res.status(400).json({ message: 'Invalid plan. Choose monthly or yearly.' });
    }

    const amount = PLAN_PRICES[plan];
    const charityPercent = req.user.charity?.contributionPercent || 10;
    const charityContribution = amount * (charityPercent / 100);
    const prizePoolContribution = (amount - charityContribution) * 0.6;

    await Payment.create({
      userId: req.user._id,
      amount,
      type: 'subscription',
      plan,
      status: 'completed',
      charityContribution,
      prizePoolContribution
    });

    const now = new Date();
    const renewalDate = new Date(now);
    if (plan === 'monthly') renewalDate.setMonth(renewalDate.getMonth() + 1);
    else renewalDate.setFullYear(renewalDate.getFullYear() + 1);

    req.user.subscription = {
      plan,
      status: 'active',
      startDate: now,
      renewalDate,
      cancelledAt: null
    };
    req.user.role = 'subscriber';
    await req.user.save();

    res.json({
      message: 'Subscription activated',
      subscription: req.user.subscription,
      payment: { amount, charityContribution, prizePoolContribution }
    });
  } catch (error) {
    console.error('subscribe error:', error.message);
    res.status(500).json({ message: 'Failed to process subscription' });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    req.user.subscription.status = 'inactive';
    req.user.subscription.cancelledAt = new Date();
    await req.user.save();

    res.json({ message: 'Subscription cancelled', subscription: req.user.subscription });
  } catch (error) {
    console.error('cancelSubscription error:', error.message);
    res.status(500).json({ message: 'Failed to cancel subscription' });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    res.json({
      subscription: req.user.subscription,
      plans: PLAN_PRICES
    });
  } catch (error) {
    console.error('getSubscriptionStatus error:', error.message);
    res.status(500).json({ message: 'Failed to fetch subscription status' });
  }
};
