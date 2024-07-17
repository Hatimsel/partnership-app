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
