const express = require('express');
const router = express.Router();

const store = require('../../client/src/assets/data/product-list.data.json');
const auth = require('../middleware/auth');
const listingMapper = require('../mappers/listings');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  category: String,
  stock: Number,
});

const Orders = mongoose.model('products', orderSchema);

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
