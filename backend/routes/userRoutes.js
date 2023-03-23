const express = require('express')
const router = express.Router()
const {registerUser,resendVerificationEmail ,loginUser, getMe, verifyUser, changepfp} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/register', registerUser)

router.post('/resendverification', resendVerificationEmail)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

router.put('/verify', verifyUser)

router.put('/changepfp', protect, changepfp)

module.exports = router