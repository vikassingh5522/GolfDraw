const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

router.use(authMiddleware, roleMiddleware('admin'));

// Users
router.get('/users', admin.getUsers);
router.put('/users/:id', admin.updateUser);
router.put('/users/:id/scores', admin.updateUserScores);

// Draws
router.post('/draws/configure', admin.configureDraw);
router.post('/draws/simulate', admin.simulateDraw);
router.post('/draws/publish', admin.publishDraw);

// Charities
router.post('/charities', admin.createCharity);
router.put('/charities/:id', admin.updateCharity);
router.delete('/charities/:id', admin.deleteCharity);

// Winners
router.get('/winners', admin.getWinners);
router.put('/winners/:id/verify', admin.verifyWinner);
router.put('/winners/:id/payout', admin.markPayout);

// Reports
router.get('/reports', admin.getReports);

module.exports = router;
