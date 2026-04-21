const express = require('express');
const router = express.Router();
const { subscribe, cancelSubscription, getSubscriptionStatus } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/subscribe', subscribe);
router.post('/cancel', cancelSubscription);
router.get('/status', getSubscriptionStatus);

module.exports = router;
