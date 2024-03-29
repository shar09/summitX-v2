const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    },
    isProfile: {
        type: Boolean,
        default: false
    },
    isResume: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);

