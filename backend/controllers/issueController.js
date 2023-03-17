const asyncHandler = require('express-async-handler')
const Issue = require('../models/issueModel')
const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId

const getIssues = asyncHandler(async (req, res) => {
    req.query.targetid && (req.query.targetid = ObjectId(req.query.targetid))
    var skip, limit, find, order
    find = {}
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}
    order = parseInt(req.query.order)
    !(order==+1 || order===-1) && (order=1)


    if(req.query.targetid && req.query.status){
        find = {"target": req.query.targetid, status: req.query.status}
    } else if(req.query.targetid){
        find = {"target": req.query.targetid}
    } else if(req.query.status && req.query.targetType){
        find = {"status": req.query.status, "targetType": req.query.targetType}
    } else if (req.query.status){
        find = {"status": req.query.status}
    } else if (req.query.targetType){
        find = {"targetType": req.query.targetType}
    } else {
        find = {}
    }

    const pipeline = [
        {"$match": find},
        {"$facet": {
            "issues": [
                { "$skip": skip },
                { "$limit": limit },
                {"$sort": {"createdDate": order}}
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const issuesQuery = await Issue.aggregate(pipeline)
    const data = {
        "issues": issuesQuery[0].issues,
        "count": issuesQuery[0].count[0]?.count
    }
    
    res.status(200).json(data)
})

const getIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.findById(req.params.issueid)
    res.status(200).json(issue)
})

const postIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.create({
        title: req.body.title,
        body: req.body.body,
        target: req.params.targetid,
        targetType: req.body.targetType,
        creator: req.user._id,
        status: 'pending'
    })
    res.status(200).json(issue)
})

const changeIssueStatus = asyncHandler(async (req, res) => {
    const issue = await Issue.findByIdAndUpdate(req.params.issueid, {status: req.body.status}, {new: true})
    if(req.body.status === 'fixed' && issue.status !== 'fixed'){
        await User.findByIdAndUpdate(issue.creator, {$inc: {karma: 10}}, {new: true})
    }
    res.status(200).json(issue)
})

const deleteIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.findByIdAndDelete(req.params.issueid)
    res.status(200).json(issue)
})

module.exports = {
    getIssues, 
    getIssue,
    postIssue, 
    changeIssueStatus, 
    deleteIssue
}