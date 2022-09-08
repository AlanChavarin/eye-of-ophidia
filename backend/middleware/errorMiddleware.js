const errorHandler = (err, req, res, next) => {
    console.log('errorhandler fired: ', err.message)
    res.json({
        errorMessage: err.message,
    })
    next()
}

module.exports = {
    errorHandler
}