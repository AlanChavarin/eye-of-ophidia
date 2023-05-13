const mongoose = require('mongoose')

const liveEventSchema = mongoose.Schema({
    embed: String,
})

module.exports = mongoose.model('LiveEvent', liveEventSchema)