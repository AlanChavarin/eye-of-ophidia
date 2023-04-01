const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')
const path = require('path')

app.use(cors({
    origin: 'http://localhost:5000',
    origin: 'http://localhost:3000'
}))

app.listen(process.env.PORT, () => {
    console.log('App started on port ' + process.env.PORT)
    console.log('App is currently in ' + process.env.NODE_ENV + ' mode.')
})

mongoose.connect(process.env.MONGO_URI, () => {
    console.log('connected to database')
})

app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

app.use('/api/matches', require('./routes/matchRoutes'))
app.use('/api/heroes', require('./routes/heroRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))  
app.use('/api/issues', require('./routes/issueRoutes'))
app.use('/api/comments', require('./routes/commentRoutes'))
app.use('/api/matchedithistory', require('./routes/matchEditHistoryRoutes'))
app.use('/api/eventedithistory', require('./routes/eventEditHistoryRoutes'))
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/names', require('./routes/nameRoutes'))

app.use(express.static('frontend/build'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve( 'frontend', 'build', 'index.html'))
})

app.use(errorHandler)
