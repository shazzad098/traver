const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', auth, async (req, res) => {
    const {
        destinationId,
        destinationName,
        fullName,
        email,
        phone,
        guests,
        date,
        specialRequests,
        totalPrice
    } = req.body;

    try {
        const newBooking = new Booking({
            user: req.user.id,
            destinationId,
            destinationName,
            fullName,
            email,
            phone,
            guests,
            date,
            specialRequests,
            totalPrice,
            paymentMethod: req.body.paymentMethod || 'card',
            paymentStatus: 'paid' // In a real app, this would be based on payment gateway response
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/bookings
// @desc    Get all bookings for a user
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
