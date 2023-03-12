const express = require('express')
const router = express.Router()
const {getIssues, getIssue, postIssue, changeIssueStatus, deleteIssue} = require('../controllers/issueController')
const {protect, protectAdmin, protectModerator, protectHelper} = require('../middleware/authMiddleware')

router.get('/:issueid', getIssue)

router.get('/', getIssues)

router.post('/:targetid', protect, postIssue)

router.put('/:issueid', protect, protectHelper, changeIssueStatus)

router.delete('/:issueid', protect, protectAdmin, deleteIssue)

module.exports = router