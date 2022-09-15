const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')

const getComments = asyncHandler(async(req, res) => {
    const comment = await Comment.find({match: req.params.matchid})
    res.status(200).json(comment)
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
    re.status(200).json(comment)
})

module.exports = {
    getComments, 
    postComment, 
    editComment, 
    deleteComment
}