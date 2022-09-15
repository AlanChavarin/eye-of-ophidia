const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const {getMatch, getMatches, postMatch, updateMatch, deleteMatch, restoreMatch} = require('../controllers/matchController')
const {protect, protectAdmin, protectModerator} = require('../middleware/authMiddleware')

const recycleBin = asyncHandler(async (req, res, next) => {
    req.recyclebin = true
    next()
})

router.get('/recyclebin', protect, protectModerator, recycleBin, getMatches)

router.get('/recyclebin/:id', protect, protectModerator, recycleBin, getMatches)

router.put('/recyclebin/:id', protect, protectModerator, restoreMatch)

router.get('/', getMatches)

router.get('/:id', getMatch)

router.post('/', protect, postMatch)

router.put('/:id', protect, protectModerator, updateMatch)

router.delete('/:id', protect, protectModerator, deleteMatch)




module.exports = router