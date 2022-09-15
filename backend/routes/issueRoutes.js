const express = require('express')
const router = express.Router()
const {getMatchIssues, postIssue, changeIssueStatus, deleteIssue} = require('../controllers/issueController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/:id', getMatchIssues)

router.post('/', protect, postIssue)

router.put('/:id', protect, protectModerator, changeIssueStatus)

router.delete('/:id', protect, protectModerator, deleteIssue)

module.exports = router