const mongoose = require('mongoose');
var moment = require('moment'); // require
// moment().format(); 

const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
}, { _id: false });

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    // unique: true,
    // sparse : true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  UserCreatedDate: {
    type: Date,
    default: moment().utc(true).format()
  },
  menu: [
    {
      _id: false, // Prevents generation of a unique _id for each item sub-document
      purchasedate: {
        type: Date,
        default: moment().utc(true).format()
      },
      purchaseAmount: {
        type: Number,
        required: true
      },
      items: [itemSchema]
    }
  ],
  AlltotalAmount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Menu', menuSchema);

