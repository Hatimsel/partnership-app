// controllers/businessController.js
const Business = require('../models/Business');
const Intermediary = require('../models/Intermediary');
const User = require('../models/User');

exports.createPartnership = async (req, res) => {
  const { intermediaryId, commissionRate } = req.body;

  try {
    const business = await Business.findOne({ user: req.user.id });
    if (!business) {
      return res.status(400).json({ msg: 'Business not found' });
    }

    const existingPartnership = business.partnerships.find(
      (partnership) => partnership.intermediary.toString() === intermediaryId
    );

    if (existingPartnership) {
      return res.status(400).json({ msg: 'Partnership already exists' });
    }

    const intermediary = await Intermediary.findOne({ user: intermediaryId });
    intermediary.partnerships.push({ business: business.id });
    await intermediary.save();

    if (!intermediary) {
      return res.status(400).json({ msg: 'Invalid intermediary' });
    }

    business.partnerships.push({
      intermediary: intermediaryId,
      commissionRate
    });
    await business.save();

    res.json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPartnerships = async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.id });
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

exports.deletePartnership = async (req, res) => {
  const { intermediaryId } = req.body;

  try {
    const business = await Business.findOne({ user: req.user.id });
    if (!business) {
      return res.status(400).json({ msg: 'Business not found' });
    }

    // Check if the partnership exists
    const partnershipIndex = business.partnerships.findIndex(
      (partnership) => partnership.intermediary.toString() === intermediaryId
    );

    if (partnershipIndex === -1) {
      return res.status(400).json({ msg: 'Partnership not found' });
    }

    // Remove the partnership
    business.partnerships.splice(partnershipIndex, 1);
    await business.save();

    return res.json({ msg: 'Partnership deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
