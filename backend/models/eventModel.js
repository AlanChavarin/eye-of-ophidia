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
    description: String,
    deleted: Boolean,
})

module.exports = mongoose.model('Event', eventSchema)