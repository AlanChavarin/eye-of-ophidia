const express = require('express')
const router = express.Router()
const {getMatchEditHistory, getMatchEdit} = require('../controllers/matchEditHistoryController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/matchedit/:editid', protect, protectModerator, getMatchEdit)

router.get('/history/:matchid', protect, protectModerator, getMatchEditHistory)

module.exports = router