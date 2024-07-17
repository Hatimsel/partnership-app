// controllers/businessController.js
const Business = require('../models/Business');
const User = require('../models/User');

exports.createPartnership = async (req, res) => {
  const { intermediaryId, commissionRate } = req.body;

  try {
    const business = await Business.findOne({ user: req.user.id });
    if (!business) {
      return res.status(400).json({ msg: 'Business not found' });
    }

    const intermediary = await User.findById(intermediaryId);
    if (!intermediary || intermediary.role !== 'intermediary') {
      return res.status(400).json({ msg: 'Invalid intermediary' });
    }

    business.partnerships.push({ intermediary: intermediaryId, commissionRate });
    await business.save();

    res.json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPartnerships = async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.id }).populate('partnerships.intermediary', 'name');
    if (!business) {
      return res.status(400).json({ msg: 'Business not found' });
    }

    res.json(business.partnerships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
