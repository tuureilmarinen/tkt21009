const mongoose = require('mongoose')

const url = process.env.DBURL

mongoose.connect(url)
//debugger

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
const Person = mongoose.model('Person', personSchema);
Person.format = (person) => {
  const formattedPerson = { ...person._doc, id: person._id }
  delete formattedPerson._id
  delete formattedPerson.__v
  return formattedPerson
}

module.exports = Person