const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const decodedUserId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
            req.user = await User.findById(decodedUserId)
            //console.log('try from authMiddleware {protect}: ',req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not Authorized')
        }
    } else {
        res.status(400)
        throw new Error('Not Authorized, no token found')
    }
})

module.exports = {protect}