const express = require('express')
const router = express.Router()
const {registerUser,resendVerificationEmail ,loginUser, getMe, verifyUser, changepfp, getUsers, changePrivileges} = require('../controllers/userController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', protect, getUsers)

router.post('/register', registerUser)

router.post('/resendverification', resendVerificationEmail)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

router.put('/verify', verifyUser)

router.put('/changepfp', protect, changepfp)

router.put('/changeprivileges', protect, protectModerator, changePrivileges)

module.exports = router