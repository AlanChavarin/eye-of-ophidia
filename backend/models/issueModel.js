const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const targetTypes = ['match', 'event']

const issueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    target: {
        type: ObjectId,
        required: true
    },
    targetType: {
        type: String,
        required: true,
        enum: targetTypes
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
}, 
{timestamps: { createdAt: 'createdDate'}})

module.exports = mongoose.model('Issue', issueSchema)