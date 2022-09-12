const asyncHandler = require('express-async-handler')
const Hero = require('../models/heroModel')

const getHeroes = asyncHandler(async (req, res) => {
    const heroes = await Hero.find({})
    res.status(200).json(heroes)
})

const postHero = asyncHandler(async (req, res) => {
    console.log(req.body.hero, req.body.young)

    if(!req.body.hero){
        res.status(400)
        throw new Error('Please enter a hero name')
    }

    const hero = await Hero.create({
        name: req.body.hero,
        young: req.body.young
    })

    res.status(200).json(hero)
})

const updateHero = asyncHandler(async (req, res) => {
    res.status(200).json(req.body)
})

const deleteHero = asyncHandler(async (req, res) => {
    if(!req.body.hero){
        res.status(400)
        throw new Error('Please enter a hero name')
    }

    const hero = await Hero.deleteOne({
        name: req.body.hero
    })

    res.status(200).json(hero)
})

module.exports = {
    getHeroes,
    postHero,
    deleteHero,
    updateHero
}