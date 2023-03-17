const mongoose = require('mongoose')
const nameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('Name', nameSchema)