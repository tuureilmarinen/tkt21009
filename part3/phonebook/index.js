const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

const Person = require('./models/person')

  //app.use(morgan('tiny'))
  app.use(bodyParser.json())
  morgan.token('req-content', function (req, res) { return JSON.stringify(req.body) })
  app.use(morgan(':method :url :status :req-content :res[content-length] - :response-time ms'))

  app.use(express.static('build'))

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons/:id', (request, response) => {
    Person
      .findById(request.params.id)
      .then(person => {
        response.json(Person.format(person))
      })
      .catch(error => {
        console.log(error)
        response.status(404).end()
      })
  })
  app.get('/api/persons', (req, res) => {
    Person
      .find({}, {__v: 0})
      .then(persons => {
        res.json(persons.map(Person.format))
      })
  })
  app.delete('/api/persons/:id', (request, response) => {
    Person
      .findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
        response.status(400).send({ error: 'malformatted id' })
      })
  })
  app.post('/api/persons', (request, response) => {
    const body=request.body
    const person = new Person({
      name: body.name,
      number: body.number
    })
    Person
    .find({name: person.name})
    .then(result => {
      if(result.length==0){
        person
        .save()
        .then(savedPerson => {
          response.json(Person.format(savedPerson))
        })
      } else {
        response.status(400).send({ error: 'name already exists' })
      }
    })



  })
  app.get('/info', (req, res) => {
    let date = new Date().toUTCString()
    Person
    .find({}, {__v: 0})
    .then(persons => {
      res.send(`Puhelinluettelossa on ${persons.length} ihmisen tiedot<br/>${date}`)
    })
  })
  app.put('/api/persons/:id', (request, response) => {
    const body = request.body
  
    const person = {
      content: body.content,
      important: body.important
    }
  
    Person
      .findByIdAndUpdate(request.params.id, person, { new: true } )
      .then(updatedPerson => {
        response.json(Person.format(updatedPerson))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  app.use((request, response) => { // 404
    response.status(404).send({error: 'unknown endpoint'})
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })