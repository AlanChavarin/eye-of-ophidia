const express = require('express')
const router = express.Router()
const {getMatchIssues, postIssue, changeIssueStatus, deleteIssue} = require('../controllers/issueController')
const {protect, protectAdmin, protectModerator, protectHelper} = require('../middleware/authMiddleware')

router.get('/:matchid', getMatchIssues)

router.post('/:matchid', protect, postIssue)

router.put('/:issueid', protect, protectHelper, changeIssueStatus)

router.delete('/:issueid', protect, protectAdmin, deleteIssue)

module.exports = router