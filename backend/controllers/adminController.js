const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const adminChangePrivileges = asyncHandler(async (req, res) => {
    const user = await User.findOneAndUpdate({_id: req.params.userid}, {privilege: req.body.privilege}, {runValidators: true, new: true})
    res.status(200).json(user)
})

const moderatorChangePrivileges = asyncHandler(async (req, res) => {
    if(req.body.privilege === 'admin'){
        req.status(400)
        throw new Error('You do not have the correct privileges to perform that action')
    }
    const user = await User.findOneAndUpdate({_id: req.params.userid}, {privilege: req.body.privilege}, {runValidators: true, new: true})
    res.status(200).json(user)
})

module.exports = {
    adminChangePrivileges,
    moderatorChangePrivileges,
}