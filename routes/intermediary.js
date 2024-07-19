// routes/intermediary.js
const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers, getPartnerships, deletePartnership } = require('../controllers/intermediaryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/customers', authMiddleware, addCustomer);
router.get('/customers', authMiddleware, getCustomers);
router.get('/partnerships', authMiddleware, getPartnerships);
router.delete('/partnerships', authMiddleware, deletePartnership);

module.exports = router;
