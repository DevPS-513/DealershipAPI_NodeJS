const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    id: { type: String, default: 'Not Defined'},
    key: { type: String, default: 'Not Defined' },
    value: {
      rev: { type: String, default: 'Not Defined' }
    },
    doc: {
      _id: { type: String, default: 'Not Defined' },
      _rev: { type: String, default: 'Not Defined' },
      id: { type: Number},
      name: { type: String, default: 'Not Defined' },
      dealership: { type: String, default: 'Not Defined' },
      review: { type: String, default: 'Not Defined' },
      sentiment: { type: String, default: 'Not Defined' },
      purchase: { type: String, default: 'Not Defined' },
      another: { type: String, default: 'Not Defined' },
      purchase_date: { type: String, default: 'Not Defined' },
      car_make: { type: String, default: 'Not Defined' },
      car_model: { type: String, default: 'Not Defined' },
      car_year: { type: Number, default: 0 },


    }
  });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review

// Example entry
/* module.exports = Review;

        "doc": {
            "_id": "52844e3d638580a4eeee1d72fbec17f6",
            "_rev": "1-3072ebde1a82289cf9619f69e3db0e0f",
            "review": {
                "id": 1114,
                "name": "Upkar Lidder",
                "dealership": 15,
                "review": "Great service!",
                "purchase": false,
                "another": "field",
                "purchase_date": "02/16/2021",
                "car_make": "Audi",
                "car_model": "Car",
                "car_year": 2021
            }
} */