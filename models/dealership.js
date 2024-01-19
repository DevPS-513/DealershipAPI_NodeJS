const mongoose = require('mongoose')


const dealershipSchema = new mongoose.Schema({
    id: { type: String, default: 'Not Defined'},
    key: { type: String, default: 'Not Defined' },
    value: {
      rev: { type: String, default: 'Not Defined' }
    },
    doc: {
      _id: { type: String, default: 'Not Defined' },
      _rev: { type: String, default: 'Not Defined' },
      id: { type: Number, default: 0, unique: true },
      city: { type: String, default: 'Not Defined' },
      state: { type: String, default: 'Not Defined' },
      st: { type: String, default: 'Not Defined' },
      address: { type: String, default: 'Not Defined' },
      zip: { type: String, default: 'Not Defined' },
      lat: { type: Number, default: 0 },
      long: { type: Number, default: 0 },
      short_name: { type: String, default: 'Not Defined' },
      full_name: { type: String, default: 'Not Defined' }
    }
  });

const Dealership = mongoose.model('Dealership', dealershipSchema);

module.exports = Dealership;