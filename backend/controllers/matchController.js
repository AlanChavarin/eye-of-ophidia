const asyncHandler = require('express-async-handler')
const Match = require('../models/matchmodel')

const getMatch = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Hello from get match!'
    })
})

const postMatch = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {player1, player2, event, date, description} = req.body
    const match = await Match.create({
        player1: {
           name: player1.name,
           hero: player1.hero,
           deck: player1.deck
        },
        player2: {
            name: player2.name,
            hero: player2.hero,
            deck: player2.deck
         },
         event: event,
         date: date,
         description: description
    })
    res.status(200).json(match)
})

const updateMatch = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Hello from update match!",
        id: (req.params.id) ? req.params.id : "no params sent"
    })
})

const deleteMatch = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Hello from delete match!",
        id: (req.params.id) ? req.params.id : "no params sent"
    })
})

module.exports = {
    getMatch,
    postMatch,
    updateMatch,
    deleteMatch
}