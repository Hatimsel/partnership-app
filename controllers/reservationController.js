// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const Business = require('../models/Business');
const Intermediary = require('../models/Intermediary');
const User = require('../models/User');

exports.makeReservation = async (req, res) => {
  const { businessId, customerName, reservationDate, details } = req.body;

  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id });
    if (!intermediary) {
      return res.status(400).json({ msg: 'Intermediary not found' });
    }

    const business = await Business.findById(businessId);
    console.log(business);
    if (!business) {
      return res.status(400).json({ msg: 'Business not found' });
    }

    // Checking if this intermediary is a partner
    const partnership = business.partnerships.find(partner => {
      return partner.intermediary.toString() === intermediary.user.toString()
    });
    if (!partnership) {
      return res.status(403).json({ msg: 'No partnership with this business' });
    }

    const reservation = new Reservation({
      intermediary: intermediary.id,
      business: business.id,
      customerName,
      reservationDate,
      details,
    });

    await reservation.save();

    // Add reservation to the intermediary's list
    intermediary.reservations.push(reservation.id);
    await intermediary.save();

    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteReservation = async (req, res) => {
  const { reservationId } = req.body;

  if (!reservationId) {
    return res.json({ msg: "Please provide a valid reservation Id" });
  }

  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id });

    if (!intermediary) {
      return res.status(404).json({ msg: 'Intermediary not found' });
    }

    // Check if the reservation exists
    const reservationIndex = intermediary.reservations.findIndex(
      (reservation) => reservation.toString() === reservationId
    );

    if (reservationIndex === -1) {
      return res.status(400).json({ msg: 'Reservation not found' });
    }

    // Remove the partnership
    intermediary.reservations.splice(reservationIndex, 1);
    await intermediary.save();

    return res.json({ msg: 'Reservation deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
}

exports.getReservationsByIntermediary = async (req, res) => {
  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id }).populate({
      path: 'reservations',
      populate: {
        path: 'business',
      },
    });
    if (!intermediary) {
      return res.status(400).json({ msg: 'Intermediary not found' });
    }

    res.json(intermediary.reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReservationsByBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.id }).populate({
      path: 'reservations',
      populate: {
        path: 'intermediary',
      },
    });
    if (!business) {
      return res.status(400).json({ msg: 'Business not found' });
    }

    const reservations = await Reservation.find({ business: business.id }).populate('intermediary', 'user');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
