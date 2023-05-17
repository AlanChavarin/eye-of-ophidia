const asyncHandler = require('express-async-handler')
const EventEditHistory = require('../models/eventEditHistoryModel')
const ObjectId = require('mongodb').ObjectId

const getEventEditHistory = asyncHandler(async (req, res) => {

    var skip, limit, find
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    find = {"parentEvent": ObjectId(req.params.eventid)}

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

    const eventEditHistoryQuery = await EventEditHistory.aggregate(pipeline)

    const data = {
        "eventEditHistories": eventEditHistoryQuery[0].histories,
        "count": eventEditHistoryQuery[0].count[0]?.count
    }

    data.eventEditHistories.map(editHistory => {
        editHistory.ownerDetails = editHistory.ownerDetails[0]
        editHistory.editorName = editHistory.ownerDetails.name
        editHistory.ownerDetails = ''
    })

    res.status(200).json(data)
})

const getEventEdit = asyncHandler(async (req, res) => {
    const eventEdit = await EventEditHistory.findOne({_id: req.params.editid})
    if(!eventEdit){
        res.status(400)
        throw new Error('Event edit with that id not found')
    }
    res.status(200).json(eventEdit)
})

//used internally
const postEventEdit = asyncHandler(async (freshlyEditedEvent, editor) => {
    const {name, location, format, startDate, endDate, top8Day, dayRoundArr, description, _id, notATypicalTournamentStructure} = freshlyEditedEvent
    
    const eventEdit = await EventEditHistory.create({
        name: name,
        location: location,
        format: format,
        startDate: startDate,
        endDate: endDate,
        top8Day: top8Day,
        dayRoundArr: dayRoundArr,
        description: description,
        notATypicalTournamentStructure: notATypicalTournamentStructure,

        //edit specific 
        editor: editor,
        parentEvent: _id 
    })
    return eventEdit
})

module.exports = {
    getEventEditHistory,
    getEventEdit,
    postEventEdit
}  