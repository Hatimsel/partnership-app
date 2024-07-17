// routes/intermediary.js
const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers } = require('../controllers/intermediaryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/customers', authMiddleware, addCustomer);
router.get('/customers', authMiddleware, getCustomers);

module.exports = router;
