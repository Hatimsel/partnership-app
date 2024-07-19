// routes/business.js
const express = require('express');
const router = express.Router();
const { createPartnership, getPartnerships, getBusinesses, deletePartnership } = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getBusinesses);
router.post('/partnerships', authMiddleware, createPartnership);
router.get('/partnerships', authMiddleware, getPartnerships);
router.delete('/partnerships', authMiddleware, deletePartnership);

module.exports = router;
