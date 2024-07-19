// models/Business.js
const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  partnerships: [
    {
      intermediary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intermediary',
        required: true,
      },
      commissionRate: {
        type: Number,
        required: true
      }
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
    },
  ],
});

module.exports = mongoose.model('Business', BusinessSchema);
