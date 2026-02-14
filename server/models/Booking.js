const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destinationId: {
        type: String,
        required: true
    },
    destinationName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        default: 2
    },
    date: {
        type: String,
        required: true
    },
    specialRequests: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: 'card'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'paid'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
