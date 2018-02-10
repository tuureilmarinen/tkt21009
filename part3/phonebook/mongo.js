

const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://user1:Fr9mtuRkK4XJqqjT@ds127888.mlab.com:27888/bananaphone'

mongoose.connect(url)

const params = process.argv.slice(2)
//debugger

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
	name: params[0],
	number: params[1]
})
person
	.save()
	.then(response => {
		console.log(`lisättiin henkilö ${person.name} numero ${person.number} luetteloon`)
		mongoose.connection.close()
	}).catch(response => {
		console.log('epic fail')
		console.log(response)
	})