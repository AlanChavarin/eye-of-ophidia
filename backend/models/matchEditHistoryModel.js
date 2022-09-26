const mongoose = require('mongoose')
const heroNames = ['Rhinar, Reckless Rampage', 'Bravo, Showstopper', 'Katsu, the Wanderer', 'Dorinthea Ironsong', 'Dash, Inventor Extraordinaire', 'Azalea, Ace in the Hole', 'Viserai, Rune Blood', 'Kano, Dracai of Aether', 'Prism, Sculptor of Arc Light', 'Ser Boltyn, Breaker of Dawn', 'Levia, Shadowborn Abomination', 'Chane, Bound by Shadow', 'Oldhim, Grandfather of Eternity', 'Lexi, Livewire', 'Briar, Warden of Thorns', 'Dromai, Ash Artist', 'Fai, Rising Rebellion', 'Iyslander, Stormbind']
const ObjectId = require('mongodb').ObjectId

const matchEditHistorySchema = mongoose.Schema({
    player1: {
        name: {type: String, required: true},
        hero: {type: String, required: true, enum: heroNames},
        deck: {type: String, required: true},
    },
    player2: {
        name: {type: String, required: true},
        hero: {type: String, required: true, enum: heroNames},
        deck: {type: String, required: true},
    },
    event: {type: String, required: true},
    link: {type: String, required: true},
    date: {type: Date, required: true},
    creator: ObjectId,
    description: String,
    deleted: Boolean,
    //edit history specific
    editor: {
        type: ObjectId,
        required: true
    },
    parentMatch: {
        type: ObjectId,
        required: true
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('MatchEditHistory', matchEditHistorySchema)