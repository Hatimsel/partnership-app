// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, getUserById, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserById);
router.delete('/profile', authMiddleware, deleteUser);

module.exports = router;
