const mongoose = require('mongoose')
const sites = ['youtube', 'twitch']

const liveEventSchema = mongoose.Schema({
    site: {
        type: String,
        enum: sites,
        required: true
    },
    link: String,
})

module.exports = mongoose.model('LiveEvent', liveEventSchema)