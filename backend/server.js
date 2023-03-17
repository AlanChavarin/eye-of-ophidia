const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')

const nodemailer = require('nodemailer')


app.use(cors({
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
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/names', require('./routes/nameRoutes'))

app.get('/api/test/:var1', async(req, res) => {
    res.status(200).json({message: req.params.var1})
})


// app.get('/api/test/', async (req, res) => {

//     let transporter = nodemailer.createTransport({
//         host: "smtp.zoho.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: process.env.EMAIL,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       })

//     let info = await transporter.sendMail({
//         from: '"eye of ophidia" <eyeofophidia@zohomail.com>', 
//         to: "buddergeeii@gmail.com", // list of receivers
//         subject: "this is a test from nodemailer", // Subject line
//         text: "this is a test from nodemailer, thank you for testing!", // plain text body
//         html: "<html><b>Hello world? I hope you recieved this message, its a test from nodemailer!</b></html>", // html body
//       })

//     console.log("Message sent: %s", info.messageId)

//     res.status(200).send('test')
// })

app.use(errorHandler)
