const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/destinations
// @desc    Get all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 });
        res.json(destinations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/destinations
// @desc    Add a new destination (Admin only)
router.post('/', [auth, admin], async (req, res) => {
    const { name, location, category, price, rating, image, description } = req.body;

    try {
        const newDestination = new Destination({
            name,
            location,
            category,
            price,
            rating,
            image,
            description
        });

        const destination = await newDestination.save();
        res.json(destination);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/destinations/:id
// @desc    Delete a destination (Admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const destination = await Destination.findById(req.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        await destination.remove();
        res.json({ message: 'Destination removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
