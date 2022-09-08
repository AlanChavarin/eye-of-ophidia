const express = require('express')
const router = express.Router()
const {getMatch, postMatch, updateMatch, deleteMatch} = require('../controllers/matchController')


router.get('/', getMatch)

router.post('/', postMatch)

router.put('/:id', updateMatch)

router.delete('/:id', deleteMatch)

module.exports = router