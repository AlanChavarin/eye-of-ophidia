const express = require('express')
const router = express.Router()
const {getEvent, getEvents, postEvent, updateEvent, deleteEvent, restoreEvent} = require('../controllers/eventController')
const {protect, protectModerator} = require('../middleware/authMiddleware')
const asyncHandler = require('express-async-handler')

const recycleBin = asyncHandler(async (req, res, next) => {
    req.recyclebin = true
    next()
})

router.get('/recyclebin', protect, protectModerator, recycleBin, getEvents)

router.get('/recyclebin/:eventid', protect, protectModerator, recycleBin, getEvent)

router.put('/recyclebin/:eventid', protect, protectModerator, restoreEvent)

router.get('/', getEvents)

router.get('/:eventid', getEvent)

router.post('/', protect, protectModerator, postEvent)

router.put('/:eventid', protect, protectModerator, updateEvent)

router.delete('/:eventid', protect, protectModerator, deleteEvent)

router.put('/:eventid', protect, protectModerator, restoreEvent)

module.exports = router