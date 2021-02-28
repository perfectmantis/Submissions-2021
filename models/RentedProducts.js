const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Float = require("mongoose-float").loadType(mongoose, 2);
const RentedProductSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      default: 001 - 00,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    customerContactNumber: {
      type: String,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
    barcodes: {
      type: Array,
    },
    //pick-up date.
    rentDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
    // Order creation date.
    order_open_date: {
      type: Date,
      default: Date.now,
    },
    // The actual date of returning..It may be on-time or late.
    returnedOn: {
      type: Date,
    },
    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "ready",
        "active",
        "past",
        "overdue",
        "lost",
        "pickup_today",
        "return_today",
        "alteration",
      ],
    },
    // This is the status before alteration and it is restored once all the alterations are marked as done...
    reservedStatus: {
      type: String,
    },
    readyForPickUp: {
      type: Boolean,
      default: false,
    },
    pickedUpStatus: {
      type: Boolean,
      default: false,
    },
    returnStatus: {
      type: Boolean,
      default: false,
    },
    insuranceAmt: {
      type: String,
    },

    total: {
      type: String,
    },
    leaveID: {
      type: Boolean,
    },
    // new fields
    customerId: {
      type: String,
    },
    extraDays: {
      type: Number,
    },
    extraDaysAmount: {
      type: Float,
    },
    total_owe: {
      type: Float,
    },
    pay_amount: {
      type: Float,
    },
    taxper: {
      type: String,
    },
    tax: {
      type: Float,
    },
    coupon_code: {
      type: String,
    },
    discount_amount: {
      type: Float,
    },
    total_without_tax: {
      type: Float,
    },
    ammount_steps: [
      {
        _id: false,
        status: String,
        date: { type: Date, default: Date.now },
      },
    ],

    authorization_logs: [
      {
        _id: false,
        employee_id: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        employee_name: String,
        status: String,
        date: { type: Date, default: Date.now },
        message: String, // eg : authorized for Pickup. Status is now "Active".
      },
    ],
  },
  { timestamps: true }
);

module.exports = RentedProduct = mongoose.model("orders", RentedProductSchema);
