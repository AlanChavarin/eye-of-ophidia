const asyncHandler = require('express-async-handler')
const MatchEditHistory = require('../models/matchEditHistoryModel')

const getMatchEditHistory = asyncHandler(async (req, res) => {
    const matchEditHistory = await MatchEditHistory.find({targetMatch: req.params.matchid})
    res.status(200).json(matchEditHistory)
})

const getMatchEdit = asyncHandler(async (req, res) => {
    const matchEdit = await MatchEditHistory.findOne({_id: req.params.editid})
    if(!matchEdit){
        res.status(400)
        throw new Error('Match edit with that id not found')
    }
    res.status(200).json(matchEdit)
})

//used internally
const postMatchEdit = asyncHandler(async (freshlyEditedMatch, editor) => {
    const {player1, player2, event, date, description, link, _id} = freshlyEditedMatch
    const matchEdit = await MatchEditHistory.create({
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
         link: link,
         date: date,
         description: description,
         editor: editor,
         parentMatch: _id
    })
    return matchEdit
})

module.exports = {
    getMatchEditHistory,
    getMatchEdit,
    postMatchEdit
}