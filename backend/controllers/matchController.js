const asyncHandler = require('express-async-handler')
const Match = require('../models/matchModel')
const Event = require('../models/eventModel')
const Name = require('../models/nameModel')
const Issue = require('../models/issueModel')
const {postMatchEdit} = require('./matchEditHistoryController') 
const ObjectId = require('mongodb').ObjectId

const getMatches = asyncHandler(async (req, res) => {
    let skip, limit, find, order
    if(!req.query?.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query?.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    order = parseInt(req.query?.order)
    !(order === 1 || order === -1) && (order = -1)

    find = {}

    if(!req.recyclebin){
        find["deleted"] = false
    } else {
        find["deleted"] = true
    }

    if(req.query?.text){
        find["$text"] = {"$search": wordWrapper(req.query.text)}
    }

    if(req.query?.hero1 && req.query?.hero2){
        find["$or"] = [
            {"player1hero": req.query.hero1, "player2hero": req.query.hero2, }, 
            {"player1hero": req.query.hero2, "player2hero": req.query.hero1, }
        ]
    } else if(req.query?.hero1){
        find["$or"] = [
            {"player1hero": req.query.hero1}, {"player2hero": req.query.hero1}, 
        ]
    } else if(req.query?.hero2){
        find["$or"] = [
            {"player1hero": req.query.hero2} , {"player2hero": req.query.hero2}, 
        ]
    }

    const date1 = new Date(req.query?.startDate)
    const date2 = new Date(req.query?.endDate)

    if(req.query?.startDate && req.query?.endDate){
        find["event.startDate"] = {"$gte": date1, "$lte": date2}
    } else if(req.query?.startDate){
        find["event.startDate"] = {"$gte": date1}
    } else if(req.query?.endDate){
        find["event.startDate"] = {"$lte": date2}
    }

    if(req.query?.format){
        find["format"] = req.query.format
    }

    const pipeline = [
        {"$match": find},
        {"$facet": {
            "matches": [
                { "$sort": {"event.startDate": order}},
                { "$skip": skip },
                { "$limit": limit },
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const matchesQuery = await Match.aggregate(pipeline)

    const data = {
        "matches": matchesQuery[0].matches,
        "count": matchesQuery[0].count[0]?.count
    }

    res.status(200)
    res.json(data)
})

const getMatchesByEvent = asyncHandler(async (req, res) => {
    var matches
    if(!req.recyclebin){req.recyclebin = false}
    if(ObjectId.isValid(req.params.event)){
        matches = await Match.find({'event._id': new ObjectId(req.params.event), deleted: req.recyclebin}).sort({top8: 1, swissRound: 1})
    } else {
        matches = await Match.find({'event.name': req.params.event, deleted: req.recyclebin}).sort({top8: 1, swissRound: 1})
    }
    if(!matches || !matches[0]){
        res.status(400)
        throw new Error('event of that name or id not found')
    }
    res.status(200)
    res.json(matches)
})

const getMatch = asyncHandler(async (req, res) => {
    if(!req.recyclebin){req.recyclebin = false}
    const match = await Match.findOne({_id: req.params.id, deleted: req.recyclebin})
    if(!match){
        res.status(400)
        throw new Error('Match with that id not found')
    }
    res.status(200)
    res.json(match)
})

const postMatch = asyncHandler(async (req, res) => {
    const {player1name, player1hero, player1deck, 
        player2name, player2hero, player2deck,
        format, event, twitch, twitchTimeStamp, link, timeStamp, description, top8, swissRound, top8Round, date
    } = req.body
    const eventData = await Event.findOne({name: event})
    if(top8 === 'true'){
        delete req.body.swissRound
    } else {
        req.body.top8Round='None'
    }
    const match = await Match.create({
        player1name: player1name,
        player1hero: player1hero,
        player1deck: player1deck,

        player2name: player2name,
        player2hero: player2hero,
        player2deck: player2deck,

        top8: top8,
        swissRound: swissRound,
        top8Round: top8Round,

        format: format,
        event: eventData,
        twitch: twitch,
        twitchTimeStamp: twitchTimeStamp,
        link: link,
        timeStamp: timeStamp,
        description: description,
        date: date,
        deleted: false
    })

    postMatchEdit(match, req.user._id)

    if(!await Name.exists({name: player1name})){Name.create({name: player1name})} 
    if(!await Name.exists({name: player2name})){Name.create({name: player2name})} 

    req.query.dontUpdateLinks !== 'true' && updateDeckLinks(req.body)

    res.status(200)
    res.json(match)
})

const updateMatch = asyncHandler(async (req, res) => {
    if(!Match.exists({_id: req.params.matchid, deleted: false})){
        res.status(400)
        throw new Error('Match with that id does not exist or has been deleted')
    }
    req.body.event = await Event.findOne({name: req.body.event})
    if(req.body.top8 === 'true'){
        delete req.body.swissRound
    } else {
        req.body.top8Round='None'
    }
    const match = await Match.findOneAndUpdate({_id: req.params.matchid, deleted: false}, req.body, {runValidators: true, new: true})
    postMatchEdit(match, req.user._id)
    if(!await Name.exists({name: req.body.player1name})){Name.create({name: req.body.player1name})} 
    if(!await Name.exists({name: req.body.player2name})){Name.create({name: req.body.player2name})} 
    req.query.dontUpdateLinks !== 'true' && updateDeckLinks(req.body)
    res.status(200)
    res.json(match)
    
})

const deleteMatch = asyncHandler(async (req, res) => {
    const match = await Match.findByIdAndUpdate(req.params.id, {deleted: true}, {new: true})
    if(!match){
        res.status(400)
        throw new Error('given match doesnt exist')
    }
    await Issue.deleteMany({target: req.params.id})
    console.log(match)
    res.status(200)
    res.json(match)
})

const restoreMatch = asyncHandler(async (req, res) => {
    const match = await Match.findByIdAndUpdate(req.params.id, {deleted: false}, {new: true})
    res.status(200)
    res.json(match)
})

const getNameLinkPairsbyEvent = asyncHandler(async (req, res) => {
    const matches = await Match.find({'event.name': req.query.event, 'format': req.query.format, deleted: false})
    
    let pairs = {}
    matches.map(match => {
        if(match.player1deck){
            pairs[match.player1name] = match.player1deck
        }
        if(match.player2deck){
            pairs[match.player2name] = match.player2deck
        }
    })

    res.status(200)
    res.json(pairs)
})

//internal use only
const updateDeckLinks = async (formData) => {

    const {player1name, player1hero, player1deck, 
        player2name, player2hero, player2deck, format
    } = formData

    let {event} = formData
    event.name && (event = event.name)

    if(player1deck){
        await Match.updateMany({
            'event.name': event, 
            'player1name': player1name,
            'player1hero': player1hero,
            'format': format,
            deleted: false
        }, {'player1deck': player1deck}, 
        {runValidators: true, new: true})

        await Match.updateMany({
            'event.name': event, 
            'player2name': player1name,
            'player2hero': player1hero,
            'format': format,
            deleted: false
        }, {'player2deck': player1deck}, 
        {runValidators: true, new: true})
    }

    if(player2deck){
        await Match.updateMany({
            'event.name': event, 
            'player2name': player2name,
            'player2hero': player2hero,
            'format': format,
            deleted: false
        }, {'player2deck': player2deck}, 
        {runValidators: true, new: true})

        await Match.updateMany({
            'event.name': event, 
            'player1name': player2name,
            'player1hero': player2hero,
            'format': format,
            deleted: false
        }, {'player1deck': player2deck}, 
        {runValidators: true, new: true})
    }
}

const wordWrapper = (query) => {
    const wrappedWord = query
    .split(" ")
    .map(word => `\"${word}\"`)
    .join(" ")
    return wrappedWord
}

module.exports = {
    getMatches,
    getMatchesByEvent,
    getMatch,
    postMatch,
    updateMatch,
    deleteMatch,
    restoreMatch,
    getNameLinkPairsbyEvent
}