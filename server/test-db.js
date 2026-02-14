const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/traver';

console.log('Testing MongoDB connection to:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: MongoDB connected');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: MongoDB connection error:', err.message);
        process.exit(1);
    });
