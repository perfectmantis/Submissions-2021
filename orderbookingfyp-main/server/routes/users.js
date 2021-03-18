const express = require('express');
const router = express.Router();

const store = require('../../client/src/assets/data/user-list.data.json');
const auth = require('../middleware/auth');
const listingMapper = require('../mappers/listings');
const mongoose = require('mongoose');

const salesRepSchema = new mongoose.Schema({
  name: String,
  email: String,
  img: String,
  totalSales: Number,
  status: String,
  lastOnline: Date,
});

const SalesReps = mongoose.model('salesreps', salesRepSchema);

router.get('/', auth, async (req, res) => {
  const response = await mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
  });

  // await Orders.remove();
  // const abc = await SalesReps.insertMany(store);

  const orders = await SalesReps.find();
  mongoose.disconnect();

  res.send(orders);
});

router.get('/:id', auth, async (req, res) => {
  const response = await mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
  });
  const orders = await SalesReps.find();
  mongoose.disconnect();

  res.send(orders);
});

module.exports = router;
