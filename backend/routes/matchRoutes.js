const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const {getMatch, getMatches, postMatch, updateMatch, deleteMatch, restoreMatch, getMatchesByEvent} = require('../controllers/matchController')
const {protect, protectAdmin, protectModerator, protectHelper} = require('../middleware/authMiddleware')

const recycleBin = asyncHandler(async (req, res, next) => {
    req.recyclebin = true
    next()
})

router.get('/recyclebin', protect, protectHelper, recycleBin, getMatches)

router.get('/recyclebin/:id', protect, protectHelper, recycleBin, getMatch)

router.put('/recyclebin/:id', protect, protectHelper, restoreMatch)

router.get('/', getMatches)

router.get('/:id', getMatch)

router.get('/byevent/:event', getMatchesByEvent)

router.post('/', protect, postMatch)

router.put('/:matchid', protect, protectHelper, updateMatch)

router.delete('/:id', protect, protectModerator, deleteMatch)

module.exports = router