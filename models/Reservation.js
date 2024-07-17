// models/Reservation.js
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  intermediary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intermediary',
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
