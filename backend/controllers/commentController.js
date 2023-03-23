const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')
const ObjectId = require('mongodb').ObjectId

const getComments = asyncHandler(async(req, res) => {
    var skip, limit
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    const pipeline = [
        {"$match": {"match": ObjectId(req.params.matchid)}},
        { "$facet": {
            "comments": [
                { "$skip": skip },
                { "$limit": limit },
                { "$lookup": {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails"
                }}
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]
    
    const commentsQuery = await Comment.aggregate(pipeline)

    const data = {
        "comments": commentsQuery[0].comments,
        "count": commentsQuery[0].count[0]?.count
    }

    data.comments.map(comment => {
        comment.ownerDetails = comment.ownerDetails[0]
        comment.name = comment.ownerDetails.name
        comment.picture = comment.ownerDetails.picture
        comment.ownerDetails = ''
    })

    res.status(200).json(data)
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