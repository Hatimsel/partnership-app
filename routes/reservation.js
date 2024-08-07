// routes/reservation.js
const express = require('express');
const router = express.Router();
const {
  makeReservation,
  getReservationsByIntermediary,
  getReservationsByBusiness,
  deleteReservation,
} = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, makeReservation);
router.get('/intermediary', authMiddleware, getReservationsByIntermediary);
router.get('/business', authMiddleware, getReservationsByBusiness);
router.delete('/intermediary', authMiddleware, deleteReservation);

module.exports = router;
