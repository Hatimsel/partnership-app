// routes/business.js
const express = require('express');
const router = express.Router();
const { createPartnership, getPartnerships, getBusinesses } = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getBusinesses);
router.post('/partnerships', authMiddleware, createPartnership);
router.get('/partnerships', authMiddleware, getPartnerships);

module.exports = router;
