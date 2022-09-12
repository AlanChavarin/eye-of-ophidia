const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Hero = require('./heroModel')

const validateHero = asyncHandler(async (hero) => {
    if(await Hero.exists({name: hero})){
        console.log(hero + ' validated');
        return true
    } else {
        console.log(hero + ' is not valid')
        return false
    }
})

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
    link: {type: String, required: true},
    date: {type: Date, required: true},
    description: String,
})




module.exports = mongoose.model('Match', matchSchema)