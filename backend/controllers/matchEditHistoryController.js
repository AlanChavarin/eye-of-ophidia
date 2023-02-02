const asyncHandler = require('express-async-handler')
const { format } = require('node:path/win32')
const MatchEditHistory = require('../models/matchEditHistoryModel')

const getMatchEditHistory = asyncHandler(async (req, res) => {
    const matchEditHistory = await MatchEditHistory.find({parentMatch: req.params.matchid})
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
    const {player1name, player1hero, player1deck, player2name, player2hero, player2deck, 
    format, date, event, link, timeStamp, description, deleted, _id, top8, top8Round, swissRound} = freshlyEditedMatch
    
    const matchEdit = await MatchEditHistory.create({
        player1name: player1name,
        player1hero: player1hero,
        player1deck: player1deck,

        player2name: player2name,
        player2hero: player2hero,
        player2deck: player2deck,

        top8: top8,
        top8Round: top8Round,
        swissRound: swissRound,
        format: format,
        event: event,
        date: date,
        link: link,
        timeStamp: timeStamp,
        description: description,
        deleted: deleted,

        //edit specific 
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