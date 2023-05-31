const mongoose = require('mongoose')
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Mixed']

const eventSchema = mongoose.Schema({
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
    notATypicalTournamentStructure: Boolean,
    dayRoundArr: [Number],
    top8Day: Boolean,
    description: String,
    image: String,
    bigImage: String,
    backgroundPosition: Number,
    deleted: Boolean,
})

module.exports = mongoose.model('Event', eventSchema)