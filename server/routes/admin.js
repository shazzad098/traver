const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
router.get('/users', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/stats
// @desc    Get site statistics (Admin only)
router.get('/stats', [auth, admin], async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const bookingCount = await Booking.countDocuments();
        const totalRevenue = await Booking.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.json({
            users: userCount,
            bookings: bookingCount,
            revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (Admin only)
router.put('/users/:id/role', [auth, admin], async (req, res) => {
    const { role } = req.body;
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent self-demotion to avoid losing admin access
        if (req.user.id === req.params.id && role !== 'admin') {
            return res.status(400).json({ message: 'Cannot demote yourself' });
        }

        user.role = role;
        await user.save();
        res.json({ message: `User role updated to ${role}`, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
