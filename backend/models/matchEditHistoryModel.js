const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']

const matchEditHistorySchema = mongoose.Schema({
    player1name: {type: String, required: true},
    player1deck: {type: String, required: true},
    player1hero: {type: String, required: true},

    player2name: {type: String, required: true},
    player2deck: {type: String, required: true},
    player2hero: {type: String, required: true},

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