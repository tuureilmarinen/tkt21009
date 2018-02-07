const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

  let persons= [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]
  
  app.use(morgan('tiny'))
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
  })
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)
    if(!person.name){
      return response.status(400).json({'error':'name must be present'})
    } else if(!person.number) {
      return response.status(400).json({'error':'number must be present'})
    } else if(persons.find((x)=>x.name===person.name)){
      return response.status(400).json({'error':'name must be unique'})
    } else { // not found
      persons.push(person)
      response.json(person)
    }

  })
  app.get('/info', (req, res) => {
    let date = new Date().toUTCString()
    console.log(date)
    let text='Puhelinluettelossa on '+persons.length+' ihmisen tiedot<br/>'+date
    res.send(text)
  })

  app.use((request, response) => { // 404
    response.status(404).send({error: 'unknown endpoint'})
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })