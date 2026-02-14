const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: function () {
            return `https://i.pravatar.cc/150?u=${this.email}`;
        }
    },
    type: {
        type: String,
        default: 'email'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        lowercase: true,
        trim: true
    },
    joinedDate: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    savedPlaces: [{
        id: String,
        name: String,
        location: String,
        price: String,
        rating: String,
        image: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
