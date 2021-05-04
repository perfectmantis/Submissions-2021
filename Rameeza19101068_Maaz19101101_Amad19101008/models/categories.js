const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    type: {
      type: String,
      enum: ["charge", "discount"],
    },
  },

  { timestamps: true }
);
module.exports = Categories = mongoose.model("categories", CategoriesSchema);
