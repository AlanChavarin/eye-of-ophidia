const express = require('express')
const router = express.Router()
const {protect, protectModerator} = require('../middleware/authMiddleware')
const {getLiveEvent, postLiveEvent} = require('../controllers/liveEventController')

router.get('/', getLiveEvent)

router.put('/', protect, protectModerator, postLiveEvent)

module.exports = router