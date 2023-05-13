const asyncHandler = require('express-async-handler')
const LiveEvent = require('../models/liveEventModel')

const getLiveEvent = asyncHandler(async (req, res) => {
    const liveEvent = await LiveEvent.findOne({})

    res.status(200).json(liveEvent)
})

const postLiveEvent = asyncHandler(async (req, res) => {
    await LiveEvent.updateOne({}, {embed: req.body.embed})
    res.status(200).json({message: 'OK'})
})

module.exports = {getLiveEvent, postLiveEvent}