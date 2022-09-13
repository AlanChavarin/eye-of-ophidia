const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        //console.log(req.body)
        res.status(400)
        throw new Error('Please add all fields')
    }
    if(await User.findOne({email: req.body.email})){
        res.status(400)
        throw new Error('User with that email already exists')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newlyCreatedUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        privilege: "user"
    })
    
    res.status(200).json({
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        token: jwt.sign(newlyCreatedUser._id.toJSON(), process.env.JWT_SECRET),
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const userThatsLoggingIn = await User.findOne({email: req.body.email})
    if(userThatsLoggingIn && (await bcrypt.compare(req.body.password, userThatsLoggingIn.password))){
        res.json({
            token: jwt.sign(userThatsLoggingIn._id.toJSON(), process.env.JWT_SECRET),
        })
    } else {
        res.status(400)
        throw new Error('Email or password was not correct')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}