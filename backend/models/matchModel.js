const mongoose = require('mongoose')
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']
const Hero = require('../models/heroModel')


const matchSchema = mongoose.Schema({
    player1name: {type: String, required: true},
    player1deck: {type: String, required: true},
    player1hero: {type: String, required: true, validate: v => heroEnum(v)},

    player2name: {type: String, required: true},
    player2deck: {type: String, required: true},
    player2hero: {type: String, required: true, validate: v => heroEnum(v)},

    event: {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true,
            enum: formats
        },
        startDate: Date,
        endDate: Date,
        description: String,
    },
    format: {type: String, required: true, enum: formats},
    link: {type: String, required: true}, 
    timeStamp: {type: Number},
    description: String, 
    deleted: Boolean
})

const heroEnum = async (v) => {
    return !!await Hero.findOne({name: v})
}


module.exports = mongoose.model('Match', matchSchema)

// const heroNames = ['Rhinar, Reckless Rampage', 'Bravo, Showstopper', 'Katsu, the Wanderer', 'Dorinthea Ironsong', 'Dash, Inventor Extraordinaire', 'Azalea, Ace in the Hole', 'Viserai, Rune Blood', 'Kano, Dracai of Aether', 'Prism, Sculptor of Arc Light', 'Ser Boltyn, Breaker of Dawn', 'Levia, Shadowborn Abomination', 'Chane, Bound by Shadow', 'Oldhim, Grandfather of Eternity', 'Lexi, Livewire', 'Briar, Warden of Thorns', 'Dromai, Ash Artist', 'Fai, Rising Rebellion', 'Iyslander, Stormbind']