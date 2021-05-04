const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require('moment');

const InventorySchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: String,
    required: true,
  },
  reservations:
    [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: String
        },
        createdOn: {
          type: Date
        }
      },
    ],

},
);

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
