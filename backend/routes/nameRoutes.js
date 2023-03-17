const express = require('express')
const router = express.Router()
const {getNames, postName, deleteName} = require('../controllers/nameController')
const {protectHelper, protect} = require('../middleware/authMiddleware')

router.get('/', protect, protectHelper, getNames)

router.post('/:name', protect, protectHelper, postName)

router.delete('/:name', protect, protectHelper, deleteName)

//router.get('/doesnameexist/:name', protect, protectHelper, doesNameExist)

module.exports = router