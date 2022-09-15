const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId

const commentSchema = mongoose.Schema({
    owner: {
        type: ObjectId,
        required: true
    },
    match: {
        type: ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comment', commentSchema)