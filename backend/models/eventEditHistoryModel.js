const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']

const eventEditHistorySchema = mongoose.Schema({
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
    backgroundPosition: Number,
    //edit history specific
    editor: {
        type: ObjectId,
        required: true
    },
    parentEvent: {
        type: ObjectId,
        required: true
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('EventEditHistory', eventEditHistorySchema)