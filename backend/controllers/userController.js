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
    
    res.status(200).json({
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        id: newlyCreatedUser._id
        //token: jwt.sign(newlyCreatedUser._id.toJSON(), process.env.JWT_SECRET),
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
    sendEmail(jwt.sign(req.body.id, process.env.EMAIL_SECRET), req.body.email)
    res.status(200).json({message: 'success'})
})

const loginUser = asyncHandler(async (req, res) => {
    const userThatsLoggingIn = await User.findOne({email: req.body.email})
    if(!userThatsLoggingIn.verified){
        res.status(400)
        throw new Error('Please verify your email before logging in.')
    }
    if(userThatsLoggingIn && (await bcrypt.compare(req.body.password, userThatsLoggingIn.password))){
        res.status(200).json({
            token: jwt.sign(userThatsLoggingIn._id.toJSON(), process.env.JWT_SECRET),
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
            if(!await User.findById(decodedUserId)){
                throw new Error('user cannot be found')
            }
            await User.findByIdAndUpdate(decodedUserId, {verified: true})
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
    res.status(200).json(user)
})



//internal use only
const sendEmail = asyncHandler(async (token, email) => {
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
        html: `<html><a href="http://localhost:3000/verify/${token}">localhost:3000/verify/${token}</a></html>`
      })

    console.log("Message sent: %s", info.messageId)
})

// const sendEmail = asyncHandler(async (token, email) => {
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: 'aron54@ethereal.email',
//             pass: 'tQpPGNR2hnSgWnjtzq'
//         }
//     })

//     let info = await transporter.sendMail({
//         from: '"eyeofophidia.net" <aron54@ethereal.email>', 
//         to: email,
//         subject: "eyeofophidia.net email verification",
//         html: `<html><a href="localhost:3000/verify/${token}">localhost:3000/verify/${token}</a></html>`
//       })

//     console.log("Message sent: %s", info.messageId)
// })

module.exports = {
    registerUser,
    resendVerificationEmail,
    loginUser,
    getMe,
    verifyUser,
    changepfp
}