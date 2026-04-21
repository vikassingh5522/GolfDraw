const subscriptionCheck = (req, res, next) => {
  if (req.user.subscription.status !== 'active') {
    return res.status(403).json({ message: 'Active subscription required' });
  }
  next();
};

module.exports = subscriptionCheck;
