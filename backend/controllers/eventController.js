const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const Match = require('../models/matchModel')
const {postEventEdit} = require('./eventEditHistoryController')
const cloudinary = require('cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
    
const handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "image",
    })
    return res
}

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
    let cldRes
    if(req.file){
        const b64 = Buffer.from(req.file.buffer).toString("base64")
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64
        cldRes = await handleUpload(dataURI)
    }

    const event = await Event.create({
        name: req.body.name,
        location: req.body.location,
        format: req.body.format,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        top8Day: req.body.top8Day,
        dayRoundArr: req.body.dayRoundArr,
        description: req.body.description,
        image: req.body.image,
        notATypicalTournamentStructure: req.body.notATypicalTournamentStructure,
        image: cldRes ? cldRes.secure_url : null,
        deleted: false,
    })
    postEventEdit(event, req.user._id)
    res.status(200).json(event)
})

const updateEvent = asyncHandler(async (req, res) => {
    delete req.body.backgroundPosition
    if(!Event.exists({_id: req.params.eventid, deleted: false})){
        res.status(400)
        throw new Error('Event with that id does not exist or has been deleted')
    }

    let cldRes

    if(req.body.resetImage){
        req.body.image = null
    } else if (!req.body.resetImage){
        delete req.body.image
    }

    if(req.file && !req.body.resetImage){
        const b64 = Buffer.from(req.file.buffer).toString("base64")
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64
        cldRes = await handleUpload(dataURI)
        req.body.image = cldRes ? cldRes.secure_url : null
    }
    
    if(typeof(req.body.dayRoundArr)==='string'){
        req.body.dayRoundArr = JSON.parse("[" + req.body.dayRoundArr + "]")
    }

    const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, req.body, {runValidators: true, new: true})
    postEventEdit(event, req.user._id)
    await Match.updateMany({'event._id': event._id}, {event: event}, {runValidators: true, new: true})
    res.status(200).json(event)
})

const editBackgroundPosition = asyncHandler(async (req, res) => {
    console.log(req.body.backgroundPosition)
    if(!Event.exists({_id: req.params.eventid, deleted: false})){
        res.status(400)
        throw new Error('Event with that id does not exist or has been deleted')
    }
    const num = parseInt(req.body.backgroundPosition)
    const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, {backgroundPosition: num}, {runValidators: true, new: true})
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
    editBackgroundPosition
}