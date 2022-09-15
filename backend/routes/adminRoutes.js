const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {adminChangePrivileges, moderatorChangePrivileges} = require('../controllers/adminController')

router.put('/admin/:id', protect, adminChangePrivileges)

router.put('/moderator/:id', protect, moderatorChangePrivileges)

module.exports = router