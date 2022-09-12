const express = require('express')
const router = express.Router()
const {getHeroes, postHero, deleteHero, updateHero} = require('../controllers/heroController')

router.get('/', getHeroes)

router.post('/', postHero)

router.put('/', updateHero)

router.delete('/', deleteHero)

module.exports = router