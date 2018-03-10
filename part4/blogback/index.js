const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())
app.use(bodyParser.json())

if ( process.env.NODE_ENV !== 'production' ) {
	require('dotenv').config()
}
const mongoUrl = process.env.MONGOURL
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

server.listen(3003, () => {
  console.log(`Server running on port ${3003}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}