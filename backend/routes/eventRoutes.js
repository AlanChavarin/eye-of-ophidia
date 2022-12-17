const express = require('express')
const router = express.Router()
const {getEvent, getEvents, postEvent, updateEvent, deleteEvent, restoreEvent} = require('../controllers/eventController')
const {protect, protectHelper} = require('../middleware/authMiddleware')

router.get('/', getEvents)

router.get('/:eventid', getEvent)

router.post('/', protect, protectHelper, postEvent)

router.put('/:eventid', protect, protectHelper, updateEvent)

router.delete('/:eventid', protect, protectHelper, deleteEvent)

router.put('/:eventid', protect, protectHelper, restoreEvent)

module.exports = router