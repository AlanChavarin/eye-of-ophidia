const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed']

const matchEditHistorySchema = mongoose.Schema({
    player1name: {type: String, required: true},
    player1hero: {type: ObjectId, required: true},
    player1deck: {type: String, required: true},

    player2name: {type: String, required: true},
    player2hero: {type: ObjectId, required: true},
    player2deck: {type: String, required: true},

    format: {type: String, required: true, enum: formats},
    event: {type: ObjectId, required: true},
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