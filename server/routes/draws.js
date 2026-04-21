const express = require('express');
const router = express.Router();
const { getDraws, getDraw, getUpcomingDraw } = require('../controllers/drawController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getDraws);
router.get('/upcoming', authMiddleware, getUpcomingDraw);
router.get('/:id', authMiddleware, getDraw);

module.exports = router;
