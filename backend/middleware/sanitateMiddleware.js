const sanitate = (req, res, next) => {
    for(field in req.query){
        req.query[field] = req.query[field].replace(/{|}|"|$/g, '')
    }
    for(field in req.body){
        req.query[body] = req.query[body].replace(/{|}|"|$/g, '')
    }
    next()
}

module.exports = {sanitate}