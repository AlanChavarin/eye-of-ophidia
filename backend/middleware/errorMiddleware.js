const errorHandler = (err, req, res, next) => {
    console.log('errorhandler fired: ', err)
    res.json({
        errorMessage: err.message,
    })
    next()
}

module.exports = {
    errorHandler
}