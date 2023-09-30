const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const Match = require('../models/matchModel')
const {postEventEdit} = require('./eventEditHistoryController')
const {handleImageFiles, handleImageDeletion} = require('./abstractions/cloudinaryHelper')
const crypto = require('crypto')

const getEvent = asyncHandler(async (req, res) => {
    if(!req.recyclebin){req.recyclebin = false}
    const event = await Event.findOne({_id: req.params.eventid, deleted: req.recyclebin})
    if(!event){
        res.status(400)
        throw new Error('Event with that id not found')
    }
    res.status(200)
    res.json(event)
})

const getEvents = asyncHandler(async (req, res) => {
    var skip, limit, find, order
    if(!req.query?.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query?.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    order = parseInt(req.query?.order)
    !(order === 1 || order ===-1) && (order = -1)

    find = {}

    if(!req.recyclebin){
        find["deleted"] = false
    } else {
        find["deleted"] = true
    }

    if(req.query?.text){
        find["$text"] = {"$search": wordWrapper(req.query.text)}
    }

    if(req.query?.startDate){
        const date = new Date(req.query.startDate)
        find["startDate"] = {"$gte": date}
    }

    if(req.query?.endDate){
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

    res.status(200)
    res.json(data)
})

const postEvent = asyncHandler(async (req, res) => { 


    if(req.files?.image && req.files?.bigImage && req.body.resetImage !== 'true'){
        //call cloudinary helper function that takes the files, handles upload, and returns the image links
        const imageObject = await handleImageFiles(req.files.image, req.files.bigImage)
        req.body.image = imageObject.image
        req.body.bigImage = imageObject.bigImage
    } else if(!req.body.image.startsWith('http') && !req.body.bigImage.startsWith('http')){
        delete req.body.image
        delete req.body.bigImage
    }

    if(!req.body.backgroundPosition){
        delete req.body.backgroundPosition
    }

    if(typeof(req.body.dayRoundArr)==='string'){
        req.body.dayRoundArr = JSON.parse("[" + req.body.dayRoundArr + "]")
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
        notATypicalTournamentStructure: req.body.notATypicalTournamentStructure,
        image: req.body.image,
        bigImage: req.body.bigImage,
        backgroundPosition: req.body.backgroundPosition,
        deleted: false,
    })

    postEventEdit(event, req.user._id)
    res.status(200)
    res.json(event)
})

const updateEvent = asyncHandler(async (req, res) => {

    if(!req.body.backgroundPosition){
        delete req.body.backgroundPosition
    }
    if(!Event.exists({_id: req.params.eventid, deleted: false})){
        res.status(400)
        throw new Error('Event with that id does not exist or has been deleted')
    }

    if(req.files?.image && req.files?.bigImage && req.body.resetImage !== 'true'){
        //call cloudinary helper function that takes the files, handles upload, and returns the image links
        const imageObject = await handleImageFiles(req.files.image, req.files.bigImage)
        req.body.image = imageObject.image
        req.body.bigImage = imageObject.bigImage
    }

    if(req.body.resetImage === 'true'){
        req.body.image = null
        req.body.bigImage = null
    } else if (req.body.resetImage !== 'false' && !req.body.image){
        delete req.body.image
        delete req.body.bigImage
    }

    if(typeof(req.body.dayRoundArr)==='string'){
        req.body.dayRoundArr = JSON.parse("[" + req.body.dayRoundArr + "]")
    }

    const oldEvent = await Event.findById(req.params.eventid)
    const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, req.body, {runValidators: true, new: true})
    

    if(oldEvent.image && (oldEvent.image !== event.image || oldEvent.bigImage !== event.bigImage) && !(await Event.findOne({image: oldEvent.image, bigImage: oldEvent.bigImage, deleted: false}))){
        await handleImageDeletion(oldEvent.image, oldEvent.bigImage)
    }

    postEventEdit(event, req.user._id)

    await Match.updateMany({'event._id': event._id}, {event: event}, {runValidators: true, new: true})

    res.status(200)
    res.json(event)
})

const editBackgroundPosition = asyncHandler(async (req, res) => {
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

const getAllBackgroundImageLinks = asyncHandler(async (req, res) => {
    const pipeline = ([
        {"$group": {"_id": {image: '$image', bigImage: '$bigImage'}}}
    ])

    const eventQuery = await Event.aggregate(pipeline)

    let data = []

    eventQuery.map(entry => {
        if(entry._id.image){
            data.push(entry._id)
        }
    })

    res.status(200)
    res.json(data)
})

const deleteEvent = asyncHandler(async (req, res) => {
    const oldEvent = await Event.findById(req.params.eventid)
    const deletionName = oldEvent.name + crypto.randomUUID()
    const event = await Event.findByIdAndUpdate(
        req.params.eventid,
        {
            deleted: true,
            name: deletionName,
        },
        { new: true },
    )

    if(!event){
        res.status(400)
        throw new Error('event not found')
    }

    res.status(200)
    res.json(event)
})

const restoreEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.eventid, {deleted: false}, {new: true})

    if(!event){
        res.status(400)
        throw new Error('event not found')
    }

    res.status(200)
    res.json(event)
})

const deleteBackgroundImage = asyncHandler(async (req, res) => {
    await handleImageDeletion(req.body.image, req.body.bigImage)

    await Event.updateMany({image: req.body.image}, {image: null, bigImage: null})
    
    res.status(200)
    res.json({message: 'images deleted'})
})

//used internally
const wordWrapper = (query) => {
    const wrappedWord = query
    .split(" ")
    .map(word => `\"${word}\"`)
    .join(" ")
    return wrappedWord
}

module.exports = {
    getEvent,
    getEvents,
    postEvent,
    updateEvent,
    deleteEvent,
    restoreEvent,
    editBackgroundPosition,
    getAllBackgroundImageLinks,
    deleteBackgroundImage
}