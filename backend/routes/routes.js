const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from get'
    })
})

router.post('/', (req, res) => {
    res.status(200).json({
        message1: "Hello from post",
        message2: (req.body.message) ? req.body.message : "No body message sent"
    })
})

router.put('/:id', (req, res) => {
    res.status(200).json({
        message: "Hello from put!",
        id: (req.params.id) ? req.params.id : "no params sent"
    })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({
        message: "Hello from delete",
        id: (req.params.id) ? req.params.id : "no params sent"
    })
})

module.exports = router