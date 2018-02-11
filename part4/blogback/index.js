const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://user1:Fr9mtuRkK4XJqqjT@ds127888.mlab.com:27888/bananaphone'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})