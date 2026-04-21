const express = require('express');
const router = express.Router();
const { getSummary, getWinnings, getParticipation } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');
const subscriptionCheck = require('../middleware/subscription');

router.use(authMiddleware, subscriptionCheck);

router.get('/summary', getSummary);
router.get('/winnings', getWinnings);
router.get('/participation', getParticipation);

module.exports = router;
