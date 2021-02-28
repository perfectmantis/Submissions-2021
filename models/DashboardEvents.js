const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const D_EventSchema = new mongoose.Schema(
  {
    events: {
      type: Array,
    },
    b_events: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);
D_EventSchema.set("autoIndex", true);
module.exports = DashboardEvents = mongoose.model(
  "dashboard_events",
  D_EventSchema
);
