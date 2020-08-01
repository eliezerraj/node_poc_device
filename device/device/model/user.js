'user strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
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

schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
    next();
});

schema.methods.validatePassword = async function validatePassword(data) {
    return await bcrypt.compare(data, this.password);
}

module.exports = mongoose.model('user', schema);