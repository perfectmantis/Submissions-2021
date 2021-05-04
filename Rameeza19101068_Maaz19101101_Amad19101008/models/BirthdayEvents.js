const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const B_EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    birthdate: {
      type: Date,
    },
    show: {
      type: Boolean,
      default: true,
    },
    timeStart: {
      required: true,
      type: String,
    },
    timeEnd: {
      required: true,
      type: String,
    },
    location: {
      type: String,
    },
    note: {
      type: String,
    },
    images: [
      {
        _id: false,
        image: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);
B_EventSchema.set("autoIndex", true);
module.exports = BirthdayEvents = mongoose.model("b_events", B_EventSchema);
