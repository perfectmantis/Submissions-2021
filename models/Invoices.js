const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new mongoose.Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'rentedproducts',
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
  },
  type: {
    type: String,
  },
  orderBarcode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
module.exports = Invoice = mongoose.model('invoices', InvoiceSchema)
