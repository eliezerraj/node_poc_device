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
    temperature: {
        type: Number,
        required: false
    },
    humidity: {
        type: Number,
        required: false
    },
    lux: {
        type: Number,
        required: false
    },
    presence: {
        type: Number,
        required: false
    },
    moisture: {
        type: Number,
        required: false
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('metric', schema);