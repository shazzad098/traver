const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/user/profile
// @desc    Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
router.put('/profile', auth, async (req, res) => {
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/user/saved-places
// @desc    Toggle saved place
router.post('/saved-places', auth, async (req, res) => {
    const place = req.body;
    try {
        const user = await User.findById(req.user.id);
        const index = user.savedPlaces.findIndex(p => p.id === place.id);

        if (index > -1) {
            // Remove if exists
            user.savedPlaces.splice(index, 1);
            await user.save();
            return res.json({ saved: false, message: 'Place removed from favorites' });
        } else {
            // Add if not exists
            user.savedPlaces.push(place);
            await user.save();
            return res.json({ saved: true, message: 'Place added to favorites' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/user/saved-places
// @desc    Get all saved places
router.get('/saved-places', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.savedPlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
