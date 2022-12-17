const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true,
    },
    talent: String,
    young: Boolean
})

module.exports = mongoose.model('Hero', heroSchema)