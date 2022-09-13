const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {changePrivileges} = require('../controllers/adminController')

router.put('/:id', protect, changePrivileges)

module.exports = router