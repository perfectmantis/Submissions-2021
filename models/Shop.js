const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  logo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  officialEmail: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: "off"
  }, 
  shopStartTime: {type: Date},
  date: {
    type: Date,
    default: Date.now,
  },

},
);

module.exports = Shop = mongoose.model("shop", ShopSchema);
