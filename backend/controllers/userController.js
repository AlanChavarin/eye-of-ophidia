const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const registerUser = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    if(req.body.name.length < 6){
        res.status(400)
        throw new Error('Name must be at least 5 characters')
    }
    if(req.body.password.length < 8){
        res.status(400)
        throw new Error('Password must be at least 7 characters')
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
        privilege: 'user',
        karma: 0,
        picture: 'bauble',
        verified: false,
    })

    sendVerificationEmail(jwt.sign({id: newlyCreatedUser._id}, process.env.EMAIL_SECRET), req.body.email)
    
    res.status(200).json({
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        id: newlyCreatedUser._id
    })
})

const resendVerificationEmail = asyncHandler(async (req, res) => {
    if(!req.body.id || !req.body.email){
        res.status(400)
        throw new Error('id or email field empty')
    }
    if(!await User.findById(req.body.id) || !await User.find({email: req.body.email})){
        res.status(400)
        throw new Error('ID or email of account does not exist')
    }
    sendVerificationEmail(jwt.sign({id: req.body.id}, process.env.EMAIL_SECRET), req.body.email)
    res.status(200).json({message: 'success'})
})

const loginUser = asyncHandler(async (req, res) => {
    const userThatsLoggingIn = await User.findOne({email: req.body.email})
    if(!userThatsLoggingIn.verified){
        sendVerificationEmail(jwt.sign({id: userThatsLoggingIn._id}, process.env.EMAIL_SECRET), userThatsLoggingIn.email)
        res.status(400)
        throw new Error('Please verify your email before logging in. A new verification email has been sent.')
    }
    if(userThatsLoggingIn && (await bcrypt.compare(req.body.password, userThatsLoggingIn.password))){
        res.status(200).json({
            token: jwt.sign({id: userThatsLoggingIn._id}, process.env.JWT_SECRET),
        })
    } else {
        res.status(400)
        throw new Error('Email or password was not correct')
    }
})

const verifyUser = asyncHandler(async (req, res) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            const decodedUserId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.EMAIL_SECRET)
            if(!await User.findById(decodedUserId.id)){
                throw new Error('user cannot be found')
            }
            await User.findByIdAndUpdate(decodedUserId.id, {verified: true})
            res.status(200).json({message: "email verified!"})
        } catch(error) {
            console.log(error)
            res.status(400)
            throw new Error('email verification failed')
        }
    } else {
        res.status(400)
        throw new Error('no verification token found')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        name: req.user.name,
        email: req.user.email,
        karma: req.user.karma,
        picture: req.user.picture,
        privilege: req.user.privilege
    })
})

const changepfp = asyncHandler(async (req, res) => {
    const user = await User.findOneAndUpdate({_id: req.user._id}, {picture: req.query.picture}, {runValidators: true, new: true})
    user.password = ''
    res.status(200).json(user)
})

const changePrivileges = asyncHandler(async (req, res) => {
    let user = await User.findById(req.query.userid)

    if(req.user.privilege!=='admin'){
        if(user.privilege==='admin' || user.privilege==='moderator'){
            res.status(400)
            throw new Error(`You cannot change another admin's or moderator's privileges`)
        }
        if(req.query.privilege==='admin' || req.query.privilege==='moderator'){
            res.status(400)
            throw new Error('You may not elevate a user to admin or moderator privileges')
        }
    }

    user = await User.findOneAndUpdate({_id: req.query.userid}, {privilege: req.query.privilege}, {runValidators: true, new: true})
    user.password = ''
    res.status(200).json(user)
})

const getUsers = asyncHandler(async (req, res) => {
    var skip, limit, pipeline
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    pipeline = []

    if(req.query.privilege){
        pipeline.push({"$match": {
            "privilege": req.query.privilege
        }})
    } 

    pipeline.push(
        { "$facet": {
        "users": [
            { "$skip": skip },
            { "$limit": limit }
        ],
        "count": [
            { "$count": "count" }
        ]}
    })

    const usersQuery = await User.aggregate(pipeline)

    const data = {
        "users": usersQuery[0].users,
        "count": usersQuery[0].count[0]?.count
    }

    res.status(200).json(data)
})

const forgotUserPassword = asyncHandler(async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({email: email})
    //check if user exists
    if(!user){
        res.status(400)
        throw new Error('That email does not exist')
    }
    const secret = process.env.JWT_SECRET + user.password
    const token = jwt.sign({email: user.email, id: user._id}, secret, {
        expiresIn: "60m"
    })
    sendPasswordResetEmail(user._id, token, email)

    res.status(200).json({message: 'Reset password link has been sent to your email.'})
})

const resetUserPassword = asyncHandler(async (req, res) => {
    const {userid, token, password} = req.body
    if(password.length < 8){
        res.status(400)
        throw new Error('Password must be 8 characters or longer')
    }

    const user = await User.findOne({_id: userid})
    //check if user exists
    if(!user){
        res.status(400)
        throw new Error('That email does not exist')
    }

    const secret = process.env.JWT_SECRET + user.password
    try{
        const decodedUser = jwt.verify(token, secret)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.findByIdAndUpdate(decodedUser.id, {password: hashedPassword})
    }catch(error){
        console.log(error)
        res.status(400)
        throw new Error('password reset failed')
    }
    
    res.status(200).json({message: 'password reset success!'})
})


//email functions, internal use only
const sendVerificationEmail = async (token, email) => {
    let link
    if(process.env.NODE_ENV==='development'){
        link = 'localhost:3000'
    } else {
        link = 'www.eyeofophidia.net'
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

    let info = transporter.sendMail({
        from: '"eye of ophidia" <eyeofophidia@zohomail.com>', 
        to: email,
        subject: "eyeofophidia.net email verification",
        html: `<html><a href="http://${link}/verify/${token}">${link}/verify/${token}</a></html>`
      })

    console.log("Message sent: %s", info.messageId)
}

const sendPasswordResetEmail = async (userid, token, email) => {
    let link
    if(process.env.NODE_ENV==='development'){
        link = 'localhost:3000'
    } else {
        link = 'www.eyeofophidia.net'
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
    })

    let info = transporter.sendMail({
        from: '"eye of ophidia" <eyeofophidia@zohomail.com>', 
        to: email,
        subject: "eyeofophidia.net password reset",
        html: `<html><a href="http://${link}/passwordreset/?token=${token}&userid=${userid}">
        http://${link}/passwordreset/?token=${token}&userid=${userid}</a></html>`
    })

    console.log("Message sent: %s", info.messageId)
}

module.exports = {
    registerUser,
    resendVerificationEmail,
    loginUser,
    getMe,
    verifyUser,
    changepfp,
    getUsers,
    changePrivileges,
    forgotUserPassword,
    resetUserPassword
}