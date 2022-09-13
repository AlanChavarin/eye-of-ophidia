const asyncHandler = require('express-async-handler')
const Match = require('../models/matchmodel')

const getMatches = asyncHandler(async (req, res) => {
    let matches
    if(req.query.hero1 && req.query.hero2 && req.query.text){
        matches = await Match.find({ 
            $text: {$search: req.query.text},
            $or: [{"player1.hero": req.query.hero1, "player2.hero": req.query.hero2, },
                {"player1.hero": req.query.hero2, "player2.hero": req.query.hero1, }]
            })
    } else if(req.query.hero1 && req.query.hero2){
        matches = await Match.find({ 
        $or: [{"player1.hero": req.query.hero1, "player2.hero": req.query.hero2, },
            {"player1.hero": req.query.hero2, "player2.hero": req.query.hero1, }]
        })
    } else if(req.query.hero1){
        matches = await Match.find({
            $or: [{"player1.hero": req.query.hero1},{"player2.hero": req.query.hero1}]
        })
    } else if(req.query.text){
        matches = await Match.find({ 
            $text: {$search: req.query.text}
        })
    } else {
        matches = await Match.find({})
    }
    res.status(200).json(matches)
})

const getMatch = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const match = await Match.findById({_id: req.params.id})
    if(!match){
        res.status(400)
        throw new Error('Match with that id not found')
    }
    res.status(200).json(match)
})

const postMatch = asyncHandler(async (req, res) => {
    if(req.user.privilege === 'banned'){
        res.status(400)
        throw new Error('User does not have the right privileges to perform a post')
    }

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
         description: description
    })
    res.status(200).json(match)
})

const updateMatch = asyncHandler(async (req, res) => {
    if(!Match.exists({_id: req.params.id})){
        res.status(400)
        throw new Error('Match with that id does not exist')
    }
    const tempMatch = await Match.findById(req.params.id)
    //console.log(req.user._id, tempMatch.creator, (tempMatch.creator.toString() === req.user._id.toString()));
    if(req.user.privilege === 'admin' || req.user.privilege === 'moderator' || req.user._id.toString() === tempMatch.creator.toString()){
        const match = await Match.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
        res.status(200).json(match)
    } else {
        res.status(400)
        throw new Error('User does not have the right privileges to perform an update')
    }
    
})

const deleteMatch = asyncHandler(async (req, res) => {
    if(req.user.privilege === 'admin' || req.user.privilege === 'moderator'){
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(match)
    } else {
        res.status(400)
        throw new Error('User does not have the right privileges to delete')
    }
    
})

module.exports = {
    getMatches,
    getMatch,
    postMatch,
    updateMatch,
    deleteMatch
}