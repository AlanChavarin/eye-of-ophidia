const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {getComments, postComment, editComment, deleteComment} = require('../controllers/commentController')
const {protect, protectModerator} = require('../middleware/authMiddleware')
const Comment = require('../models/commentModel')

const protectCorrectUser = asyncHandler(async (req, res, next) => {
    if(req.user._id.toString() !== (await Comment.findById(req.params.commentid))?.owner.toString()){
        res.status(400)
        throw new Error('You do not have privileges to delete/edit this comment')
    } else {
        next()
    }
})

//router.put('/moderator/:commentid', protect, protectModerator, editComment)

router.delete('/moderator/:commentid', protect, protectModerator, deleteComment)

router.get('/:matchid', getComments)

router.post('/:matchid', protect, postComment)

router.put('/:commentid', protect, protectCorrectUser, editComment)

router.delete('/:commentid', protect, protectCorrectUser, deleteComment)


module.exports = router