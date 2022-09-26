const express = require('express')
const router = express.Router()
const {getMatchEditHistory, getMatchEdit} = require('../controllers/matchEditHistoryController')
const {protect, protectAdmin, protectModerator, protectHelper} = require('../middleware/authMiddleware')

router.get('/matchedit/:editid', getMatchEdit)

router.get('/history/:matchid', getMatchEditHistory)

module.exports = router