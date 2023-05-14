const asyncHandler = require('express-async-handler')
const LiveEvent = require('../models/liveEventModel')

const getLiveEvent = asyncHandler(async (req, res) => {
    const liveEvent = await LiveEvent.findOne({})

    res.status(200).json(liveEvent)
})

const postLiveEvent = asyncHandler(async (req, res) => {
    if(await LiveEvent.findOne({})){
        await LiveEvent.updateOne({}, {
            site: req.body.site,
            link: req.body.link,
        })
    } else {
        await LiveEvent.create({
            site: req.body.site,
            link: req.body.link,
        })
    }
    
    res.status(200).json({message: 'OK'})
})

module.exports = {getLiveEvent, postLiveEvent}