const asyncHandler = require('express-async-handler')
const Issue = require('../models/issueModel')

const getMatchIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({match: req.params.id})
    res.status(200).json(issues)
})

const postIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.create({
        title: req.body.title,
        body: req.body.body,
        match: req.body.id,
        status: 'pending'
    })
    res.status(200).json(issue)
})

const changeIssueStatus = asyncHandler(async (req, res) => {
    const issue = await Issue.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true})
    res.status(200).json(issue)
})

const deleteIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.findByIdAndDelete(req.params.id)
    res.status(200).json(issue)
})

module.exports = {
    getMatchIssues, 
    postIssue, 
    changeIssueStatus, 
    deleteIssue
}