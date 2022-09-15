const express = require('express')
const router = express.Router()
const {protect, protectAdmin, protectModerator} = require('../middleware/authMiddleware')
const {adminChangePrivileges, moderatorChangePrivileges} = require('../controllers/adminController')

router.put('/admin/:userid', protect, protectAdmin, adminChangePrivileges)

router.put('/moderator/:userid', protect, protectModerator, moderatorChangePrivileges)

module.exports = router