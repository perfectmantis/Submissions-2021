const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alterNotesSchema = new mongoose.Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'orders',
    },
    order_id: String,
    note: {
      type: String,
      required: true,
    },
    alter_request: {
      type: Boolean,
      default: false,
    },
    emp_name: String,
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = alterNotes = mongoose.model('alternotes', alterNotesSchema)
