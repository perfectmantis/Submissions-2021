const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  disabled: {
    type: String,
    default: false,
  },
  color: [
    {
      colorname: {
        type: String,
      },
      sizes: [
        {
          _id: false,
          id: String,
          size: String,
          price: String,
          qty: String,
          barcodes: [
            {
              barcode: Number,
              isLost: { type: Boolean, default: false },
              isRented: { type: Boolean, default: false },
              quality: { type: String, default: 'good-condition',enum:['good-condition', 'minor-damage', 'major-damage'] },
              status:{type:String, default: 'Active',enum:['Active', 'Disable']},
              authorization_logs: [
                {
                  _id: false,
                  employee_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'user',
                  },
                  employee_name: String,
                  date: { type: Date, default: Date.now },
                  message: String, // eg : authorized for Update, Added item to inventoy
                },
              ],
              images:[{
                _id: false,
                img:{type:String},
                date: { type: Date, default: Date.now },
              },
              ],

            },
          ],
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true }

)
ProductSchema.set('autoIndex', true);
module.exports = Product = mongoose.model('products', ProductSchema);

