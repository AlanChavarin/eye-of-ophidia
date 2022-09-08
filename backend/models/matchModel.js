const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
    player1: {
        name: {type: String, required: true},
        hero: {type: String, required: true},
        deck: {type: String, required: true},
    },
    player2: {
        name: {type: String, required: true},
        hero: {type: String, required: true},
        deck: {type: String, required: true},
    },
    event: {type: String, required: true},
    date: {type: Date, required: true},
    description: String
})


module.exports = mongoose.model('Match', matchSchema)