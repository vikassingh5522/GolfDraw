const express = require('express');
const router = express.Router();
const { getCharities, getCharity, selectCharity, donateToCharity } = require('../controllers/charityController');
const authMiddleware = require('../middleware/auth');

router.get('/', getCharities);
router.get('/:id', getCharity);
router.put('/select', authMiddleware, selectCharity);
router.post('/donate', authMiddleware, donateToCharity);

module.exports = router;
