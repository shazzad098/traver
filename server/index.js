const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/support', require('./routes/support'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Traver API is running...');
});

// Database Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/traver';
console.log('Connecting to MongoDB:', mongoURI.replace(/:([^@]+)@/, ':****@')); // Hide password in log

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
