const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']

const eventEditHistorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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