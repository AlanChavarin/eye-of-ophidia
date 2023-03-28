const express = require('express')
const router = express.Router()
const {getEventEditHistory, getEventEdit} = require('../controllers/eventEditHistoryController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/eventedit/:editid', protect, protectModerator, getEventEdit)

router.get('/history/:eventid', protect, protectModerator, getEventEditHistory)

module.exports = router