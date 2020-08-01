'user strict'

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    event: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    event_type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('event', schema);