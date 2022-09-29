const asyncHandler = require('express-async-handler')
const Match = require('../models/matchModel')
const {postMatchEdit} = require('./matchEditHistoryController') 

const getMatches = asyncHandler(async (req, res) => {
    let matches
    if(!req.recyclebin){req.recyclebin = false}
    if(req.query.hero1 && req.query.hero2 && req.query.text){
        matches = await Match.find({ 
                $text: {$search: req.query.text},
                $or: [{"player1.hero": req.query.hero1, "player2.hero": req.query.hero2, },
                    {"player1.hero": req.query.hero2, "player2.hero": req.query.hero1, }],
                deleted: req.recyclebin
            })
    } else if(req.query.hero1 && req.query.hero2){
        matches = await Match.find({ 
                $or: [{"player1.hero": req.query.hero1, "player2.hero": req.query.hero2, },
                    {"player1.hero": req.query.hero2, "player2.hero": req.query.hero1, }],
                deleted: req.recyclebin
            })
    } else if(req.query.hero1 && req.query.text){
        matches = await Match.find({ 
                $text: {$search: req.query.text},
                $or: [{"player1.hero": req.query.hero1},
                    {"player2.hero": req.query.hero1, }],
                deleted: req.recyclebin
            })
    } else if(req.query.hero2 && req.query.text){
        matches = await Match.find({ 
            $text: {$search: req.query.text},
            $or: [{"player1.hero": req.query.hero2},
                {"player2.hero": req.query.hero2, }],
            deleted: req.recyclebin
        })
    }
    else if(req.query.hero1){
        matches = await Match.find({
            $or: [{"player1.hero": req.query.hero1},{"player2.hero": req.query.hero1}],
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
    //console.log(req.params.id)
    if(!req.recyclebin){req.recyclebin = false}
    const match = await Match.findOne({_id: req.params.id, deleted: req.recyclebin})
    if(!match){
        res.status(400)
        throw new Error('Match with that id not found')
    }
    res.status(200).json(match)
})

const postMatch = asyncHandler(async (req, res) => {
    const {player1, player2, event, date, description, link} = req.body
    if( !player1.name || !player1.hero || !player1.deck || 
        !player2.name || !player2.hero || !player2.deck ||
        !event || !date || !link){
            res.status(400)
            throw new Error('Please enter all fields')
    }
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
         link: link,
         date: date,
         creator: req.user._id,
         description: description,
         deleted: false
    })
    postMatchEdit(match, req.user_id)
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
    const match = await Match.findByIdAndUpdate(req.params.id, {deleted: false})
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