const express = require('express');
const router = express.Router();

const store = require('../store/orders');
const auth = require('../middleware/auth');
const listingMapper = require('../mappers/listings');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  customer: String,
  image: String,
  amount: Number,
  orderStatus: String,
  paymentStatus: String,
  date: Date,
});

const Orders = mongoose.model('orders', orderSchema);

router.get('/', auth, async (req, res) => {
  const response = await mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
  });

  // await Orders.remove();
  // const abc = await Orders.insertMany(store);

  const orders = await Orders.find();
  mongoose.disconnect();

  res.send(orders);
});

router.get('/:id', auth, async (req, res) => {
  const response = await mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
  });
  const orders = await Orders.find();
  mongoose.disconnect();

  res.send(orders);
});

module.exports = router;
