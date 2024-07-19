// controllers/intermediaryController.js
const Intermediary = require('../models/Intermediary');

exports.addCustomer = async (req, res) => {
  const { name, details } = req.body;

  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id });
    if (!intermediary) {
      return res.status(400).json({ msg: 'Intermediary not found' });
    }

    intermediary.customers.push({ name, details });
    await intermediary.save();

    res.json(intermediary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id });
    if (!intermediary) {
      return res.status(400).json({ msg: 'Intermediary not found' });
    }

    res.json(intermediary.customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPartnerships = async (req, res) => {
  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id });
    if (!intermediary) {
      return res.status(400).json({ msg: 'Intermediary not found' });
    }

    res.json(intermediary.partnerships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deletePartnership = async (req, res) => {
  const { businessId } = req.body;

  try {
    const intermediary = await Intermediary.findOne({ user: req.user.id });
    if (!intermediary) {
      return res.status(400).json({ msg: 'Intermediary not found' });
    }

    // Check if the partnership exists
    const partnershipIndex = intermediary.partnerships.findIndex(
      (partnership) => partnership.business.toString() === businessId
    );

    if (partnershipIndex === -1) {
      return res.status(400).json({ msg: 'Partnership not found' });
    }

    // Remove the partnership
    intermediary.partnerships.splice(partnershipIndex, 1);
    await intermediary.save();

    return res.json({ msg: 'Partnership deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
