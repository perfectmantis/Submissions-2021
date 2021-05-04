const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new mongoose.Schema(
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
    images:[{
      _id: false,
      image:{type:String},
      date: { type: Date, default: Date.now },
    }],
    // pdfFile:[{ 
    //   _id: false,
    //   file:{type:String},
    //   date: { type: Date, default: Date.now },
    // }],
    user:
      {
        type: String,
      }
  },

  { timestamps: true }
);
EventSchema.set("autoIndex", true);
module.exports = Events = mongoose.model("events", EventSchema);
