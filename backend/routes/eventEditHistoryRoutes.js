const express = require('express')
const router = express.Router()
const {getEventEditHistory, getEventEdit} = require('../controllers/eventEditHistoryController')
const {protect, protectAdmin, protectModerator, protectHelper} = require('../middleware/authMiddleware')

router.get('/eventedit/:editid', getEventEdit)

router.get('/history/:eventid', getEventEditHistory)

module.exports = router