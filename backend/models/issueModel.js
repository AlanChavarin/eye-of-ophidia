const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId

const issueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    match: {
        type: ObjectId,
        required: true
    },
    creator: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'fixed', 'closed']
    }
})

module.exports = mongoose.model('Issue', issueSchema)