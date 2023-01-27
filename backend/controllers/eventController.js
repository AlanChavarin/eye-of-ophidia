const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')

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
    if(!req.recyclebin){req.recyclebin = false}
    const events = await Event.find({deleted: req.recyclebin})
    res.status(200).json(events)
})

const postEvent = asyncHandler(async (req, res) => {
    console.log(req.body)
    const event = await Event.create({
        name: req.body.name,
        location: req.body.location,
        format: req.body.format,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        deleted: false,
    })
    res.status(200).json(event)
})

const updateEvent = asyncHandler(async (req, res) => {
    if(!Event.exists({_id: req.params.eventid, deleted: false})){
        res.status(400)
        throw new Error('Event with that id does not exist or has been deleted')
    }
    const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, req.body, {runValidators: true, new: true})
    //postEventEdit
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