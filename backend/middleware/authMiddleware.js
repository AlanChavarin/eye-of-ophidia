const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const decodedUserId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
            req.user = await User.findById(decodedUserId.id)
            if(req.user.privilege==='banned'){
                res.status(400)
                throw new Error('Banned')
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not Authorized - ' + error)
        }
    } else {
        res.status(400)
        throw new Error('Not Authorized, no token found')
    }
})

const protectAdmin = asyncHandler(async (req, res, next) => {
    if(req.user?.privilege === 'admin'){
        next()
    } else {
        res.status(400)
        throw new Error('You need admin privileges to access this function')
    }
})

const protectModerator = asyncHandler(async (req, res, next) => {
    if(req.user?.privilege === 'admin' || req.user?.privilege === 'moderator'){
        next()
    } else {
        res.status(400)
        throw new Error('You need admin or moderator privileges to access this function')
    }
})

// const protectHelper = asyncHandler(async (req, res, next) => {
//     if(req.user.privilege === 'admin' || req.user.privilege === 'moderator' || req.user.privilege === 'helper'){
//         next()
//     } else {
//         res.status(400)
//         throw new Error('You need admin or moderator privileges to access this function')
//     }
// }) 

module.exports = {protect, protectAdmin, protectModerator}