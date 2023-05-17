const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const Match = require('../models/matchModel')
const {postEventEdit} = require('./eventEditHistoryController')

const getEvent = asyncHandler(async (req, res) => {
    if(!req.recyclebin){req.recyclebin = false}
    const event = await Event.findOne({_id: req.params.eventid, deleted: req.recyclebin})
    if(!event){
        res.status(400)
        throw new Error('Event with that id not found')
    }
    res.status(200).json(event)
})

const getEvents = asyncHandler(async (req, res) => {
    var skip, limit, find, order
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    order = parseInt(req.query.order)
    !(order === 1 || order ===-1) && (order = -1)

    find = {}

    if(!req.recyclebin){
        find["deleted"] = false
    } else {
        find["deleted"] = true
    }

    if(req.query.text){
        find["$text"] = {"$search": req.query.text}
    }

    if(req.query.startDate){
        const date = new Date(req.query.startDate)
        find["startDate"] = {"$gte": date}
    }

    if(req.query.endDate){
        const date = new Date(req.query.endDate)
        find["startDate"] = {"$lt": date}
    }

    const pipeline = [
        {"$match": find},
        { "$facet": {
            "events": [
                {"$sort": {"startDate": order}},
                { "$skip": skip },
                { "$limit": limit },
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const eventsQuery = await Event.aggregate(pipeline)

    const data = {
        "events": eventsQuery[0].events,
        "count": eventsQuery[0].count[0]?.count
    }

    res.status(200).json(data)
})

const postEvent = asyncHandler(async (req, res) => {
    const event = await Event.create({
        name: req.body.name,
        location: req.body.location,
        format: req.body.format,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        top8Day: req.body.top8Day,
        dayRoundArr: req.body.dayRoundArr,
        description: req.body.description,
        notATypicalTournamentStructure: req.body.notATypicalTournamentStructure,
        deleted: false,
    })
    postEventEdit(event, req.user._id)
    res.status(200).json(event)
})

const updateEvent = asyncHandler(async (req, res) => {
    if(!Event.exists({_id: req.params.eventid, deleted: false})){
        res.status(400)
        throw new Error('Event with that id does not exist or has been deleted')
    }
    const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, req.body, {runValidators: true, new: true})
    postEventEdit(event, req.user._id)
    await Match.updateMany({'event._id': event._id}, {event: event}, {runValidators: true, new: true})
    res.status(200).json(event)
})

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.eventid, {deleted: true}, {new: true})
    res.status(200).json(event)
})

const restoreEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.eventid, {deleted: false}, {new: true})
    res.status(200).json(event)
})

module.exports = {
    getEvent,
    getEvents,
    postEvent,
    updateEvent,
    deleteEvent,
    restoreEvent,
}