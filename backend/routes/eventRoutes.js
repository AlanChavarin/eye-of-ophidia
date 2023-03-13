const express = require('express')
const router = express.Router()
const {getEvent, getEvents, postEvent, updateEvent, deleteEvent, restoreEvent} = require('../controllers/eventController')
const {protect, protectHelper} = require('../middleware/authMiddleware')
const asyncHandler = require('express-async-handler')

const recycleBin = asyncHandler(async (req, res, next) => {
    req.recyclebin = true
    next()
})

router.get('/recyclebin', protect, protectHelper, recycleBin, getEvents)

router.get('/recyclebin/:eventid', protect, protectHelper, recycleBin, getEvent)

router.put('/recyclebin/:eventid', protect, protectHelper, restoreEvent)

router.get('/', getEvents)

router.get('/:eventid', getEvent)

router.post('/', protect, protectHelper, postEvent)

router.put('/:eventid', protect, protectHelper, updateEvent)

router.delete('/:eventid', protect, protectHelper, deleteEvent)

router.put('/:eventid', protect, protectHelper, restoreEvent)

module.exports = router