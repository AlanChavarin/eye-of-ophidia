const asyncHandler = require('express-async-handler')
const Match = require('../models/matchmodel')
const Hero = require('../models/heroModel')

const getMatch = asyncHandler(async (req, res) => {
    let matchResult
    if(req.query.hero1 && req.query.hero2 && req.query.text){
        matchesResult = await Match.find({ 
            $text: {$search: req.query.text},
            $or: [{"player1.hero": req.query.hero1, "player2.hero": req.query.hero2, },
                {"player1.hero": req.query.hero2, "player2.hero": req.query.hero1, }]
            })
    } else if(req.query.hero1 && req.query.hero2){
        matchesResult = await Match.find({ 
        $or: [{"player1.hero": req.query.hero1, "player2.hero": req.query.hero2, },
            {"player1.hero": req.query.hero2, "player2.hero": req.query.hero1, }]
        })
    } else if(req.query.hero1){
        matchesResult = await Match.find({
            $or: [{"player1.hero": req.query.hero1},{"player2.hero": req.query.hero1}]
        })
    } else if(req.query.text){
        matchesResult = await Match.find({ 
            $text: {$search: req.query.text}
        })
    } else {
        matchesResult = await Match.find({})
    }
    res.status(200).json(matchesResult)
})

const postMatch = asyncHandler(async (req, res) => {
    const {player1, player2, event, date, description, link} = req.body
    if(!(await Hero.exists({name: player1.hero})) || !(await Hero.exists({name: player2.hero}))){
        res.status(400)
        throw new Error('Hero with that name doesnt exist! Double check your spelling')
    }
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
         description: description
    })
    res.status(200).json(match)
})

const updateMatch = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!Match.exists({_id: req.params.id})){
        res.status(400)
        throw new Error('Match with that id does not exist')
    }

    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(match)
})

const deleteMatch = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Hello from delete match! This method isn't finished yet!",
        id: (req.params.id) ? req.params.id : "no params sent"
    })
})

module.exports = {
    getMatch,
    postMatch,
    updateMatch,
    deleteMatch
}