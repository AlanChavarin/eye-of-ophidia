const asyncHandler = require('express-async-handler')
const MatchEditHistory = require('../models/matchEditHistoryModel')
const ObjectId = require('mongodb').ObjectId

const getMatchEditHistory = asyncHandler(async (req, res) => {

    var skip, limit, find
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    find = {"parentMatch": ObjectId(req.params.matchid)}

    const pipeline = [
        {"$match": find},
        { "$facet": {
            "histories": [
                { "$skip": skip },
                { "$limit": limit },
                { "$sort": {"createdAt": -1}},
                { "$lookup": {
                    from: "users",
                    localField: "editor",
                    foreignField: "_id",
                    as: "ownerDetails"
                }}
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const matchEditHistoryQuery = await MatchEditHistory.aggregate(pipeline)

    const data = {
        "matchEditHistories": matchEditHistoryQuery[0].histories,
        "count": matchEditHistoryQuery[0].count[0]?.count
    }

    data.matchEditHistories.map(editHistory => {
        editHistory.ownerDetails = editHistory.ownerDetails[0]
    })

    res.status(200).json(data)
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