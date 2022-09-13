const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const changePrivileges = asyncHandler(async (req, res) => {
    if(!(req.user.privilege === 'admin')){
        res.status(400)
        throw new Error('User does not have the right privileges to perform this put')
    }
    const user = await User.findOneAndUpdate({_id: req.params.id}, {privilege: req.body.privilege}, {runValidators: true, new: true})
    res.status(200).json(user)
})

module.exports = {
    changePrivileges
}