const express = require('express')
const router = express.Router()
const {getHeroes, getHero, postHero, deleteHero, updateHero} = require('../controllers/heroController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getHeroes)

router.get('/:heroid', getHero)

router.post('/', protect, protectModerator, postHero)

router.put('/', protect, protectModerator, updateHero)

router.delete('/', protect, protectModerator, deleteHero)

module.exports = router