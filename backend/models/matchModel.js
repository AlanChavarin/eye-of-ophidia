const mongoose = require('mongoose')
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']
const top8Rounds = ['Quarter Finals', 'Semi Finals', 'Finals', 'None']
const Hero = require('../models/heroModel')
const ObjectId = require('mongodb').ObjectId


const matchSchema = mongoose.Schema({
    player1name: {type: String, required: true},
    player1deck: {type: String},
    player1hero: {type: String, required: true, validate: v => heroEnum(v)},

    player2name: {type: String, required: true},
    player2deck: {type: String},
    player2hero: {type: String, required: true, validate: v => heroEnum(v)},

    // winner: {type: string, required: true},

    event: {
        _id: {
            type: ObjectId,
            required: true
        },
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
        notATypicalTournamentStructure: Boolean,
        dayRoundArr: [Number],
        top8Day: Boolean,
        description: String,
        image: String,
        backgroundPosition: Number
    },

    top8: {type: Boolean, required: true},
    swissRound: {type: Number, validate: function(v){
        if(this._update){
            if(!this._update.$set.top8 && v){return true}
            else if(this._update.$set.top8 && !v){return true}
            else {return false}
        } 
        else if(!this.top8 && v){return true}
        else if(this.top8 && !v){return true}
        else {return false}
    }},
    top8Round: {type: String, enum: top8Rounds, validate: function(v){
        if(this._update){
            if(this._update.$set.top8 && v!=='None'){return true}
            else if(!this._update.$set.top8 && v==='None') {return true}
            else {return false}
        } else if (this.top8 && v!=='None'){return true}
        else if(!this.top8 && v==='None'){return true}
        else {return false}
    }},

    format: {type: String, required: true, enum: formats},
    twitch: Boolean,
    twitchTimeStamp: String,
    link: {type: String, required: true}, 
    timeStamp: {type: Number},
    description: String, 
    date: { //only used if event has notATypicalTournament set to true
        type: Date,
        min: this.event?.startDate,
        max: this.event?.endDate,
    }, 
    deleted: Boolean
})

const heroEnum = async (v) => {
    return !!await Hero.findOne({name: v})
}

module.exports = mongoose.model('Match', matchSchema)

// const heroNames = ['Rhinar, Reckless Rampage', 'Bravo, Showstopper', 'Katsu, the Wanderer', 'Dorinthea Ironsong', 'Dash, Inventor Extraordinaire', 'Azalea, Ace in the Hole', 'Viserai, Rune Blood', 'Kano, Dracai of Aether', 'Prism, Sculptor of Arc Light', 'Ser Boltyn, Breaker of Dawn', 'Levia, Shadowborn Abomination', 'Chane, Bound by Shadow', 'Oldhim, Grandfather of Eternity', 'Lexi, Livewire', 'Briar, Warden of Thorns', 'Dromai, Ash Artist', 'Fai, Rising Rebellion', 'Iyslander, Stormbind']