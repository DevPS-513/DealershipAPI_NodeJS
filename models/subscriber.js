const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscriber: {
        type: String,
        required: true
    },
    subscriberdate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber',subscriberSchema)