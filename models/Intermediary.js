// models/Intermediary.js
const mongoose = require('mongoose');

const IntermediarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partnerships: [
    {
      business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
      },
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
    },
  ],
});

module.exports = mongoose.model('Intermediary', IntermediarySchema);
