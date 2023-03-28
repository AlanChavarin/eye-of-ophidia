const express = require('express')
const router = express.Router()
const {getNames, postName, deleteName} = require('../controllers/nameController')
const {protectModerator, protect} = require('../middleware/authMiddleware')

router.get('/', protect, protectModerator, getNames)

router.post('/:name', protect, protectModerator, postName)

router.delete('/:name', protect, protectModerator, deleteName)

//router.get('/doesnameexist/:name', protect, protectHelper, doesNameExist)

module.exports = router