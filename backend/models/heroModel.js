const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    young: Boolean
})

module.exports = mongoose.model('Hero', heroSchema)