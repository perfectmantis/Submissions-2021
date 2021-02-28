const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppointmentsSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
    },
    date: {
      type: Date,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
    categories: {
      type: Array,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      default: "New",
      enum: ["Cancelled", "CheckedIn", "New"],
    },
    checkedInAt: {
      type: String,
    },
  },

  { timestamps: true }
);
module.exports = Appointments = mongoose.model(
  "appointments",
  AppointmentsSchema
);
