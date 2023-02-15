const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')

const getComments = asyncHandler(async(req, res) => {
    var comments = await Comment.find({match: req.params.matchid})
    if(req.query.ownerdetails==='true'){
        let ids = []
        comments.map(comment => ids.push(comment.owner))
        const users = await User.find({_id: {$in: ids}})
        users.map(user => comments.map(comment => {
            if(user._id.equals(comment.owner)){
                comment.ownerDetails = user
            }
        }))
    }
    res.status(200).json(comments)
})

const postComment = asyncHandler(async(req, res) => {
    const comment = await Comment.create({
        owner: req.user._id,
        match: req.params.matchid,
        body: req.body.body
    })
    res.status(200).json(comment)
})

const editComment = asyncHandler(async(req, res) => {
    const comment = await Comment.findByIdAndUpdate(
    req.params.commentid,
    { body: req.body.body },
    {new: true})
    res.status(200).json(comment)
})

const deleteComment = asyncHandler(async(req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.commentid)
    res.status(200).json(comment)
})

module.exports = {
    getComments, 
    postComment, 
    editComment, 
    deleteComment
}