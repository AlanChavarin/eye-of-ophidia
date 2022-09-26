const asyncHandler = require('express-async-handler')
const Issue = require('../models/issueModel')
const User = require('../models/userModel')

const getMatchIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({match: req.params.matchid})
    res.status(200).json(issues)
})

const postIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.create({
        title: req.body.title,
        body: req.body.body,
        match: req.params.matchid,
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
    getMatchIssues, 
    postIssue, 
    changeIssueStatus, 
    deleteIssue
}