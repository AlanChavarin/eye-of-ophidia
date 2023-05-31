const express = require('express')
const router = express.Router()
const {getEvent, getEvents, postEvent, updateEvent, deleteEvent, restoreEvent, editBackgroundPosition} = require('../controllers/eventController')
const {protect, protectModerator} = require('../middleware/authMiddleware')
const asyncHandler = require('express-async-handler')
const multer = require('multer')

const recycleBin = asyncHandler(async (req, res, next) => {
    req.recyclebin = true
    next()
})

const storage = new multer.memoryStorage()
const upload = multer({
    storage,
    limits: {fileSize: 1000000}
})

router.get('/recyclebin', protect, protectModerator, recycleBin, getEvents)

router.get('/recyclebin/:eventid', protect, protectModerator, recycleBin, getEvent)

router.put('/recyclebin/:eventid', protect, protectModerator, restoreEvent)

router.get('/', getEvents)

router.get('/:eventid', getEvent)

router.post('/', protect, protectModerator, upload.fields([{name: 'image'}, {name: 'bigImage'}]), postEvent)

router.put('/editbackgroundposition/:eventid', protect, protectModerator, editBackgroundPosition)

router.put('/:eventid', protect, protectModerator, upload.fields([{name: 'image'}, {name: 'bigImage'}]), updateEvent)

router.delete('/:eventid', protect, protectModerator, deleteEvent)

router.put('/:eventid', protect, protectModerator, restoreEvent)


module.exports = router