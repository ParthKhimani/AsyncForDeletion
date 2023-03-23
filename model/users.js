const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: Number,
    emailId: String,
    password: String
})

module.exports = mongoose.model('User', usersSchema)