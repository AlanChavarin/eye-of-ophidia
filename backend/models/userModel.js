const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
        required: true,
        enum: ['admin', 'moderator', 'helper', 'user', 'banned'] 
    },
    karma: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true,
        enum: ['bauble', 'blood', 'eye', 'grand', 'heart', 'shard', 'tit']
    },
    verified: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)