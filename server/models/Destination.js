const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        default: '5.0'
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);
