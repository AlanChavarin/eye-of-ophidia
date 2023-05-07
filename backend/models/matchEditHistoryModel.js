const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']
const top8Rounds = ['Quarter Finals', 'Semi Finals', 'Finals', 'None']

const matchEditHistorySchema = mongoose.Schema({
    player1name: {type: String, required: true},
    player1deck: {type: String},
    player1hero: {type: String, required: true},

    player2name: {type: String, required: true},
    player2deck: {type: String},
    player2hero: {type: String, required: true},

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
        dayRoundArr: [Number],
        top8Day: Boolean,
        description: String,
    },

    top8: {type: Boolean, required: true},
    swissRound: {type: Number},
    top8Round: {type: String, enum: top8Rounds},
    format: {type: String, required: true, enum: formats},
    twitch: Boolean,
    link: {type: String, required: true}, 
    timeStamp: {type: Number},
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