const asyncHandler = require('express-async-handler')
const Match = require('../models/matchModel')
const Event = require('../models/eventModel')
const {postMatchEdit} = require('./matchEditHistoryController') 

const getMatches = asyncHandler(async (req, res) => {
    let matches
    if(!req.recyclebin){req.recyclebin = false}
    if(req.query.hero1 && req.query.hero2 && req.query.text){
        matches = await Match.find({ 
                $text: {$search: req.query.text},
                $or: [{"player1hero": req.query.hero1, "player2hero": req.query.hero2, },
                    {"player1hero": req.query.hero2, "player2hero": req.query.hero1, }],
                deleted: req.recyclebin
            })
    } else if(req.query.hero1 && req.query.hero2){
        matches = await Match.find({ 
                $or: [{"player1hero": req.query.hero1, "player2hero": req.query.hero2, },
                    {"player1hero": req.query.hero2, "player2hero": req.query.hero1, }],
                deleted: req.recyclebin
            })
    } else if(req.query.hero1 && req.query.text){
        matches = await Match.find({ 
                $text: {$search: req.query.text},
                $or: [{"player1hero": req.query.hero1},
                    {"player2hero": req.query.hero1, }],
                deleted: req.recyclebin
            })
    } else if(req.query.hero2 && req.query.text){
        matches = await Match.find({ 
            $text: {$search: req.query.text},
            $or: [{"player1hero": req.query.hero2},
                {"player2hero": req.query.hero2, }],
            deleted: req.recyclebin
        })
    }
    else if(req.query.hero1){
        matches = await Match.find({
            $or: [{"player1hero": req.query.hero1},{"player2hero": req.query.hero1}],
            deleted: req.recyclebin
        })
    } else if(req.query.text){
        matches = await Match.find({ 
            $text: {$search: req.query.text},
            deleted: req.recyclebin
        })
    } else {
        matches = await Match.find({deleted: req.recyclebin})
    }
    res.status(200).json(matches)
})

const getMatch = asyncHandler(async (req, res) => {
    if(!req.recyclebin){req.recyclebin = false}
    const match = await Match.findOne({_id: req.params.id, deleted: req.recyclebin})
    if(!match){
        res.status(400)
        throw new Error('Match with that id not found')
    }
    res.status(200).json(match)
})

const postMatch = asyncHandler(async (req, res) => {
    const {player1name, player1hero, player1deck, 
        player2name, player2hero, player2deck,
        format, event, link, timeStamp, description
    } = req.body
    const eventData = await Event.findOne({name: event})
    const match = await Match.create({
        player1name: player1name,
        player1hero: player1hero,
        player1deck: player1deck,

        player2name: player2name,
        player2hero: player2hero,
        player2deck: player2deck,

        format: format,
        event: eventData,
        link: link,
        timeStamp: timeStamp,
        description: description,
        deleted: false
    })
    postMatchEdit(match, req.user._id)
    res.status(200).json(match)
})

const updateMatch = asyncHandler(async (req, res) => {
    if(!Match.exists({_id: req.params.matchid, deleted: false})){
        res.status(400)
        throw new Error('Match with that id does not exist or has been deleted')
    }
    const match = await Match.findOneAndUpdate({_id: req.params.matchid, deleted: false}, req.body, {runValidators: true, new: true})
    postMatchEdit(match, req.user._id)
    res.status(200).json(match)
    
})

const deleteMatch = asyncHandler(async (req, res) => {
    const match = await Match.findByIdAndUpdate(req.params.id, {deleted: true}, {new: true})
    res.status(200).json(match)
})

const restoreMatch = asyncHandler(async (req, res) => {
    const match = await Match.findByIdAndUpdate(req.params.id, {deleted: false}, {new: true})
    res.status(200).json(match)
})

module.exports = {
    getMatches,
    getMatch,
    postMatch,
    updateMatch,
    deleteMatch,
    restoreMatch
}